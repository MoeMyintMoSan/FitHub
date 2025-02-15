import { NextResponse } from "next/server";
import { findUserByEmail, updateUserById } from "../db/queries";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user); // Send user data
    } catch (error) {
        console.log("Error finding user by email:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

export async function POST(req) {
  const userData = await req.json();

  if (!userData.user_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const updatedUser = await updateUserById(userData.user_id, userData);
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("Error updating user:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}