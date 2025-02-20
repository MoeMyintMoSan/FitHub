import { NextResponse } from "next/server";
import { findCurrentUserByEmail } from "../../db/queries";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        const currentUser = await findCurrentUserByEmail(email);
        if (!currentUser) {
            return NextResponse.json({ error: "Current user not found" }, { status: 404 });
        }

        return NextResponse.json(currentUser); // Send current user data
    } catch (error) {
        console.log("Error finding current user by email:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}