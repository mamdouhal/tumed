// API route for Faaliyetler CRUD operations
// GET: List all activities (with pagination)
// POST: Create new activity (admin only)

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { faaliyetSchema } from "@/lib/validations"

// GET /api/admin/faaliyetler - List all activities
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    // Check if user is authenticated and is admin
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      )
    }

    // Get query parameters for pagination
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Fetch activities with pagination
    const [faaliyetler, total] = await Promise.all([
      prisma.faaliyet.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.faaliyet.count(),
    ])

    return NextResponse.json({
      data: faaliyetler,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("GET /api/admin/faaliyetler error:", error)
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    )
  }
}

// POST /api/admin/faaliyetler - Create new activity
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    // Check if user is authenticated and is admin
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = faaliyetSchema.parse(body)

    // Create new activity
    const faaliyet = await prisma.faaliyet.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        imageUrl: validatedData.imageUrl || null,
      },
    })

    return NextResponse.json(faaliyet, { status: 201 })
  } catch (error) {
    console.error("POST /api/admin/faaliyetler error:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 }
    )
  }
}
