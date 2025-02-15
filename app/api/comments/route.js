import { NextResponse } from "next/server";
import sql from "@/app/api/db/config";
import { findUserByEmail } from "../db/queries";
// GET Comments for a specific post
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get("post_id");

    if (!post_id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const comments = await sql`
      SELECT c.comment_id, c.content, c.post_id, u.user_id, u.user_name
      FROM "Comment" c
      JOIN users u ON c.user_id = u.user_id
      WHERE c.post_id = ${post_id}
      ORDER BY c.comment_id DESC;
    `;

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST - Add a new comment
export async function POST(req) {
  try {
    const { email, post_id, content } = await req.json();

    if (!email || !post_id || !content) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    const user_id = user.user_id;

    const result = await sql`
      INSERT INTO "Comment" (user_id, post_id, content)
      VALUES (${user_id}, ${post_id}, ${content})
      RETURNING comment_id, content, post_id, user_id;
    `;

    const comment = result[0];
    comment.user_name = user.user_name
    
    return NextResponse.json({ message: "Comment added", comment: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
