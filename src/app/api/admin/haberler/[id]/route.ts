// API route for individual Haber operations
// GET: Get single news by ID
// PUT: Update news (admin only)
// DELETE: Delete news (admin only)

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { updateHaberSchema } from "@/lib/validations"

type RouteParams = {
  params: Promise<{ id: string }>
}

// GET /api/admin/haberler/[id] - Get single news
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

    const haber = await prisma.haber.findUnique({
      where: { id },
    })

    if (!haber) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(haber)
  } catch (error) {
    console.error("GET /api/admin/haberler/[id] error:", error)
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/haberler/[id] - Update news
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
    const validatedData = updateHaberSchema.parse(body)

    // Check if news exists
    const existing = await prisma.haber.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      )
    }

    // Update news
    const updateData: any = { ...validatedData }
    if (validatedData.publishDate) {
      updateData.publishDate = new Date(validatedData.publishDate)
    }

    const haber = await prisma.haber.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(haber)
  } catch (error) {
    console.error("PUT /api/admin/haberler/[id] error:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/haberler/[id] - Delete news
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

    // Check if news exists
    const existing = await prisma.haber.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      )
    }

    // Delete news
    await prisma.haber.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "News deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("DELETE /api/admin/haberler/[id] error:", error)
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    )
  }
}
