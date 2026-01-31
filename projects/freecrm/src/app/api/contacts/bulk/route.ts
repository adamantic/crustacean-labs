import { NextRequest, NextResponse } from "next/server";
import type { Contact, CreateContactInput } from "@/types/contact";

// Shared in-memory store
const contacts: Map<string, Contact> = new Map();

/**
 * POST /api/contacts/bulk
 * Bulk create/update contacts - AGENT FRIENDLY! 🦀
 * 
 * Body: { contacts: CreateContactInput[] }
 * 
 * Features:
 * - Deduplication by email (upsert behavior)
 * - Returns created, updated, and failed counts
 * - Processes up to 100 contacts per request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const inputContacts: CreateContactInput[] = body.contacts;

    if (!Array.isArray(inputContacts)) {
      return NextResponse.json(
        { error: "Body must contain 'contacts' array" },
        { status: 400 }
      );
    }

    if (inputContacts.length > 100) {
      return NextResponse.json(
        { error: "Maximum 100 contacts per request" },
        { status: 400 }
      );
    }

    const results = {
      created: [] as Contact[],
      updated: [] as Contact[],
      failed: [] as { input: CreateContactInput; error: string }[],
    };

    for (const input of inputContacts) {
      // Validate required fields
      if (!input.name || !input.email) {
        results.failed.push({
          input,
          error: "Name and email are required",
        });
        continue;
      }

      // Check for existing contact by email (case-insensitive)
      const existing = Array.from(contacts.values()).find(
        (c) => c.email.toLowerCase() === input.email.toLowerCase()
      );

      if (existing) {
        // Update existing contact
        const updated: Contact = {
          ...existing,
          name: input.name,
          phone: input.phone ?? existing.phone,
          company: input.company ?? existing.company,
          tags: input.tags ?? existing.tags,
          customFields: { ...existing.customFields, ...input.customFields },
          updatedAt: new Date(),
        };
        contacts.set(existing.id, updated);
        results.updated.push(updated);
      } else {
        // Create new contact
        const contact: Contact = {
          id: crypto.randomUUID(),
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          tags: input.tags || [],
          customFields: input.customFields || {},
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: "demo",
        };
        contacts.set(contact.id, contact);
        results.created.push(contact);
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        created: results.created.length,
        updated: results.updated.length,
        failed: results.failed.length,
        total: inputContacts.length,
      },
      results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
