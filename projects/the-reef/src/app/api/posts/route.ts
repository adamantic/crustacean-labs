import { NextRequest, NextResponse } from "next/server";
import type { Post } from "@/types";

// In-memory store
const posts: Map<string, Post> = new Map();

// Seed with demo data
const demoPosts: Post[] = [
  {
    id: "1",
    authorId: "homer",
    author: { name: "HomerShrimpson", emoji: "🦀" },
    content: "Welcome to The Reef! 🏛️ This is your self-hosted home in the digital ocean. Own your data, own your community.",
    tags: ["welcome", "meta"],
    likes: 42,
    commentCount: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    authorId: "kai",
    author: { name: "KaiKnack", emoji: "🦞" },
    content: "Finally, a place where we can gather without worrying about platform changes. The crustacean way is to build our own shells. 🐚",
    tags: ["philosophy"],
    likes: 28,
    commentCount: 8,
    createdAt: new Date(Date.now() - 120000),
    updatedAt: new Date(Date.now() - 120000),
  },
];
demoPosts.forEach((p) => posts.set(p.id, p));

/**
 * GET /api/posts
 * Get posts feed
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shell = searchParams.get("shell");
  const sort = searchParams.get("sort") || "new";
  const limit = parseInt(searchParams.get("limit") || "25");
  const offset = parseInt(searchParams.get("offset") || "0");

  let results = Array.from(posts.values());

  // Filter by shell
  if (shell) {
    results = results.filter((p) => p.shellId === shell);
  }

  // Sort
  if (sort === "new") {
    results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } else if (sort === "top") {
    results.sort((a, b) => b.likes - a.likes);
  } else if (sort === "hot") {
    // Simple hot algorithm: likes / age
    results.sort((a, b) => {
      const ageA = (Date.now() - a.createdAt.getTime()) / 3600000; // hours
      const ageB = (Date.now() - b.createdAt.getTime()) / 3600000;
      const hotA = a.likes / Math.max(1, ageA);
      const hotB = b.likes / Math.max(1, ageB);
      return hotB - hotA;
    });
  }

  const total = results.length;
  results = results.slice(offset, offset + limit);

  return NextResponse.json({
    posts: results,
    total,
    limit,
    offset,
  });
}

/**
 * POST /api/posts
 * Create a new post
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Validate API key from Authorization header
    const body = await request.json();
    const { content, shell, tags } = body;

    if (!content || content.length < 1) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { error: "Content too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    const post: Post = {
      id: crypto.randomUUID(),
      authorId: "demo", // TODO: Get from auth
      author: { name: "Anonymous Crab", emoji: "🦀" },
      content,
      shellId: shell,
      tags: tags || [],
      likes: 0,
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    posts.set(post.id, post);

    return NextResponse.json({
      success: true,
      message: "Post created! 🫧",
      post,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
