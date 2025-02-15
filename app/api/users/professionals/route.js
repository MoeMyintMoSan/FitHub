import { NextResponse } from "next/server";
import { updateToProfessionalById } from "../../db/queries";

export async function POST(req) {
  const userData = await req.json();

  if (!userData.user_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const updatedUser = await updateToProfessionalById(userData.user_id, userData.user_type);
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("Error updating user:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}