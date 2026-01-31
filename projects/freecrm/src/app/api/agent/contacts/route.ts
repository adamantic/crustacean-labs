import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { z } from 'zod'
import type { Contact } from '@/db'
import { createContact, getContacts } from '@/db'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  notes: z.string().optional(),
})

function getUserId(): string {
  const headersList = headers()
  const { userId } = auth()
  if (userId) {
    return userId
  }
  const apiKey = headersList.get('x-api-key')
  if (apiKey !== process.env.AGENT_API_KEY) {
    throw new Error('Invalid or missing API key')
  }
  const userIdHeader = headersList.get('x-user-id')
  if (!userIdHeader) {
    throw new Error('x-user-id header is required for API key authentication')
  }
  return userIdHeader
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId()
    const contacts = getContacts(userId)
    return NextResponse.json(contacts)
  } catch (error: any) {
    console.error('GET /api/agent/contacts error:', error)
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId()
    const body = await request.json()
    const data = contactSchema.parse(body)
    const contact = createContact({ ...data, userId } as any)
    return NextResponse.json(contact, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/agent/contacts error:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}