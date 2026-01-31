import { NextRequest, NextResponse } from "next/server";
import type { Contact, CreateContactInput } from "@/types/contact";

// In-memory store for demo - will be replaced with Supabase
const contacts: Map<string, Contact> = new Map();

// Seed with demo data
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

/**
 * GET /api/contacts
 * List all contacts with optional filtering
 * 
 * Query params:
 * - search: Filter by name, email, or company
 * - tags: Filter by tags (comma-separated)
 * - limit: Max results (default 100)
 * - offset: Pagination offset
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const tags = searchParams.get("tags")?.split(",").map((t) => t.trim());
  const limit = parseInt(searchParams.get("limit") || "100");
  const offset = parseInt(searchParams.get("offset") || "0");

  let results = Array.from(contacts.values());

  // Filter by search
  if (search) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.company?.toLowerCase().includes(search)
    );
  }

  // Filter by tags
  if (tags && tags.length > 0) {
    results = results.filter((c) =>
      tags.some((tag) => c.tags.includes(tag))
    );
  }

  // Pagination
  const total = results.length;
  results = results.slice(offset, offset + limit);

  return NextResponse.json({
    contacts: results,
    total,
    limit,
    offset,
  });
}

/**
 * POST /api/contacts
 * Create a new contact
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateContactInput = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = Array.from(contacts.values()).find(
      (c) => c.email.toLowerCase() === body.email.toLowerCase()
    );
    if (existing) {
      return NextResponse.json(
        { error: "Contact with this email already exists", existingId: existing.id },
        { status: 409 }
      );
    }

    const contact: Contact = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      tags: body.tags || [],
      customFields: body.customFields || {},
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: "demo", // TODO: Get from auth
    };

    contacts.set(contact.id, contact);

    return NextResponse.json({ contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
