// app/api/forms/route.js
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate the incoming data
    if (!body.data || !Array.isArray(body.data)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      )
    }
    
    // Create a new form entry
    const formEntry = await prisma.formEntry.create({
      data: {
        name: body.name || 'Untitled Form',
        data: JSON.stringify(body.data)
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      id: formEntry.id 
    })
  } catch (error) {
    console.error('Error saving form data:', error)
    return NextResponse.json(
      { error: 'Failed to save form data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const entries = await prisma.formEntry.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    })
    
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching form entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch form entries' },
      { status: 500 }
    )
  }
}