import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { z } from 'zod'
import type { Contact } from '@/db'
import { getContact, updateContact } from '@/db'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  notes: z.string().optional(),
})

const updateSchema = contactSchema.partial()

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserId()
    const contact = getContact(params.id, userId)
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }
    return NextResponse.json(contact)
  } catch (error: any) {
    console.error('GET /api/agent/contacts/[id] error:', error)
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserId()
    const body = await request.json()
    const data = updateSchema.parse(body)
    const contact = updateContact(params.id, userId, data)
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found or unauthorized' }, { status: 404 })
    }
    return NextResponse.json(contact)
  } catch (error: any) {
    console.error('PATCH /api/agent/contacts/[id] error:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}