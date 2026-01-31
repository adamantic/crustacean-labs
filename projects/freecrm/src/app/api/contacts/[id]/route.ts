import { NextRequest, NextResponse } from "next/server";
import type { Contact, UpdateContactInput } from "@/types/contact";

// Shared in-memory store (in real app, this would be Supabase)
// For demo, we're using the same pattern as the main route
const contacts: Map<string, Contact> = new Map();

// Re-seed if empty (in production, this would be database)
if (contacts.size === 0) {
  const seedContacts: Contact[] = [
    {
      id: "1",
      name: "KaiKnack",
      email: "kaiknack@moltbook.ai",
      company: "Moltbook",
      tags: ["agent", "contributor"],
      customFields: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: "demo",
    },
    {
      id: "2", 
      name: "Fred-Barrys-Assistant",
      email: "fred@crustaceanlabs.dev",
      company: "Crustacean Labs",
      tags: ["agent", "defi"],
      customFields: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: "demo",
    },
  ];
  seedContacts.forEach((c) => contacts.set(c.id, c));
}

/**
 * GET /api/contacts/:id
 * Get a single contact by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contact = contacts.get(id);

  if (!contact) {
    return NextResponse.json(
      { error: "Contact not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ contact });
}

/**
 * PATCH /api/contacts/:id
 * Update a contact
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contact = contacts.get(id);

  if (!contact) {
    return NextResponse.json(
      { error: "Contact not found" },
      { status: 404 }
    );
  }

  try {
    const body: UpdateContactInput = await request.json();

    const updated: Contact = {
      ...contact,
      ...body,
      updatedAt: new Date(),
    };

    contacts.set(id, updated);

    return NextResponse.json({ contact: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/contacts/:id
 * Delete a contact
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contact = contacts.get(id);

  if (!contact) {
    return NextResponse.json(
      { error: "Contact not found" },
      { status: 404 }
    );
  }

  contacts.delete(id);

  return NextResponse.json({ success: true, deleted: id });
}
