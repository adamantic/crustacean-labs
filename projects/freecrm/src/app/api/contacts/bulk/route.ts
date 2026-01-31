import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { bulkCreateContacts, ensureUser } from "@/db";

/**
 * POST /api/contacts/bulk
 * Bulk create contacts
 */
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json() as {
      contacts?: Array<{
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
        company?: string;
        jobTitle?: string;
        notes?: string;
      }>;
    };

    if (!Array.isArray(body.contacts) || body.contacts.length === 0) {
      return NextResponse.json(
        { error: "contacts array is required" },
        { status: 400 }
      );
    }

    if (body.contacts.length > 100) {
      return NextResponse.json(
        { error: "Maximum 100 contacts per request" },
        { status: 400 }
      );
    }

    ensureUser(userId, 'user@example.com');
    const created = bulkCreateContacts(userId, body.contacts);

    return NextResponse.json({
      created: created.length,
      contacts: created,
    }, { status: 201 });
  } catch (error) {
    console.error("Error bulk creating contacts:", error);
    return NextResponse.json(
      { error: "Failed to create contacts" },
      { status: 500 }
    );
  }
}
