import { NextRequest, NextResponse } from "next/server";
import type { Interaction, CreateInteractionInput } from "@/types/interaction";

// In-memory store
const interactions: Map<string, Interaction> = new Map();

/**
 * GET /api/interactions
 * Get interactions, optionally filtered by contactId
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contactId = searchParams.get("contactId");
  const type = searchParams.get("type");
  const limit = parseInt(searchParams.get("limit") || "50");

  let results = Array.from(interactions.values());

  if (contactId) {
    results = results.filter((i) => i.contactId === contactId);
  }

  if (type) {
    results = results.filter((i) => i.type === type);
  }

  // Sort by occurredAt descending
  results.sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime());
  results = results.slice(0, limit);

  return NextResponse.json({
    interactions: results,
    total: results.length,
  });
}

/**
 * POST /api/interactions
 * Log a new interaction
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateInteractionInput = await request.json();

    if (!body.contactId || !body.type || !body.content) {
      return NextResponse.json(
        { error: "contactId, type, and content are required" },
        { status: 400 }
      );
    }

    const validTypes = ["call", "email", "meeting", "note", "task"];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    const interaction: Interaction = {
      id: crypto.randomUUID(),
      contactId: body.contactId,
      type: body.type,
      content: body.content,
      occurredAt: body.occurredAt ? new Date(body.occurredAt) : new Date(),
      createdBy: "demo",
      createdAt: new Date(),
    };

    interactions.set(interaction.id, interaction);

    return NextResponse.json({
      success: true,
      message: "Interaction logged! 📝",
      interaction,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
