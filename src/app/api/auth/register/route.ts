import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // TODO: Implement user registration
  return NextResponse.json(
    { error: 'Registration not implemented yet' },
    { status: 501 }
  )
}