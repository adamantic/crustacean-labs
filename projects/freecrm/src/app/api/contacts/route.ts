import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getContacts, createContact, ensureUser } from "@/db";

/**
 * GET /api/contacts
 * List all contacts for the authenticated user
 */
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100");
  const offset = parseInt(searchParams.get("offset") || "0");

  const contacts = getContacts(userId);
  const paginated = contacts.slice(offset, offset + limit);

  return NextResponse.json({
    contacts: paginated,
    total: contacts.length,
    limit,
    offset,
  });
}

/**
 * POST /api/contacts
 * Create a new contact
 */
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json() as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      company?: string;
      jobTitle?: string;
      notes?: string;
    };

    if (!body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    ensureUser(userId, 'user@example.com');

    const contact = createContact({
      userId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company,
      jobTitle: body.jobTitle,
      notes: body.notes,
    });

    return NextResponse.json({ contact }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}
