import { NextResponse } from "next/server";
import { likeAtoP, unlikeAtoP } from "../../../db/queries"; // Import your database query functions

export async function POST(req) {
    const { athlete_id, professional_id, action } = await req.json();

    if (!athlete_id || !professional_id || !action) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        let result;
        if (action === "like") {
            result = await likeAtoP(athlete_id, professional_id);
        } else if (action === "unlike") {
            result = await unlikeAtoP(athlete_id, professional_id);
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        if (!result) {
            return NextResponse.json({ error: "Operation failed" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating like:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}