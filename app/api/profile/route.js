import { NextResponse } from "next/server";
import { findEmailById } from "../db/queries";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const email = await findEmailById(userId);
    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    return NextResponse.json(email); // Send user data
  } catch (error) {
    console.log("Error finding email by ID:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}