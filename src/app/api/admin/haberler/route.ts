// API route for Haberler (News) CRUD operations
// GET: List all news (with pagination)
// POST: Create new news (admin only)

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { haberSchema } from "@/lib/validations"

// GET /api/admin/haberler - List all news
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

    // Fetch news with pagination
    const [haberler, total] = await Promise.all([
      prisma.haber.findMany({
        skip,
        take: limit,
        orderBy: { publishDate: "desc" },
      }),
      prisma.haber.count(),
    ])

    return NextResponse.json({
      haberler,
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error("GET /api/admin/haberler error:", error)
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}

// POST /api/admin/haberler - Create new news
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
    console.log("Received body:", body)
    
    const validatedData = haberSchema.parse(body)
    console.log("Validated data:", validatedData)

    // Create new news
    const haber = await prisma.haber.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        category: validatedData.category,
        imageUrl: validatedData.imageUrl || null,
        publishDate: validatedData.publishDate ? new Date(validatedData.publishDate) : new Date(),
      },
    })

    console.log("Created haber:", haber)
    return NextResponse.json(haber, { status: 201 })
  } catch (error) {
    console.error("POST /api/admin/haberler error:", error)
    console.error("Error details:", JSON.stringify(error, null, 2))

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create news", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
