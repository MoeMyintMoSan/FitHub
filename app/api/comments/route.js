import { NextResponse } from "next/server";
import sql from "@/api/db/config";
import {fetchCommentsByPostId, createComment } from "../db/queries";
// GET Comments for a specific post
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get("post_id");

    if (!post_id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const comments = await fetchCommentsByPostId(post_id);
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

    const comment = await createComment(email, post_id, content);
    return NextResponse.json(comment, { status: 201 });

  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
