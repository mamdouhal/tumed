// API route for individual Faaliyet operations
// GET: Get single activity by ID
// PUT: Update activity (admin only)
// DELETE: Delete activity (admin only)

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { updateFaaliyetSchema } from "@/lib/validations"

type RouteParams = {
  params: Promise<{ id: string }>
}

// GET /api/admin/faaliyetler/[id] - Get single activity
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      )
    }

    const { id } = await params

    const faaliyet = await prisma.faaliyet.findUnique({
      where: { id },
    })

    if (!faaliyet) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(faaliyet)
  } catch (error) {
    console.error("GET /api/admin/faaliyetler/[id] error:", error)
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/faaliyetler/[id] - Update activity
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = updateFaaliyetSchema.parse(body)

    // Check if activity exists
    const existing = await prisma.faaliyet.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      )
    }

    // Update activity
    const faaliyet = await prisma.faaliyet.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json(faaliyet)
  } catch (error) {
    console.error("PUT /api/admin/faaliyetler/[id] error:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to update activity" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/faaliyetler/[id] - Delete activity
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if activity exists
    const existing = await prisma.faaliyet.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      )
    }

    // Delete activity
    await prisma.faaliyet.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "Activity deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("DELETE /api/admin/faaliyetler/[id] error:", error)
    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 }
    )
  }
}
