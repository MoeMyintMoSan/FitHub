import { NextResponse } from "next/server";
import { findBioById } from "../../../db/queries";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("user_id");
    
    if (!id) {
        return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    try {
        const bio = await findBioById(id);
        if (!bio) {
            return NextResponse.json({ error: "Bio not found" }, { status: 404 });
        }

        return NextResponse.json(bio); // Send professional bio
    } catch (error) {
        console.log("Error finding bio by id:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
