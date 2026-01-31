import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getContact, updateContact, deleteContact } from "@/db";

/**
 * GET /api/contacts/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contact = getContact(id, userId);
  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({ contact });
}

/**
 * PUT /api/contacts/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json() as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    notes?: string;
  };
  
  const updated = updateContact(id, userId, body);
  
  if (!updated) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({ contact: updated });
}

/**
 * DELETE /api/contacts/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = deleteContact(id, userId);
  if (!deleted) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
