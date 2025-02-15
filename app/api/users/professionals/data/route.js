import { NextResponse } from "next/server";
import { postCountsById, registeredCountsById, likeProCountsById } from "../../../db/queries";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("user_id");
    
    if (!id) {
        return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    try {
        const [posts, registered, likePro] = await Promise.all([
            postCountsById(id),
            registeredCountsById(id),
            likeProCountsById(id)
          ]);
        if (!posts) {
            return NextResponse.json({ error: "Posts not found" }, { status: 404 });
        }
        if (!registered) {
            return NextResponse.json({ error: "Registered athletes not found" }, { status: 404 });
        }
        if (!likePro) {
            return NextResponse.json({ error: "Like count not found" }, { status: 404 });
        }

        return NextResponse.json({posts, registered, likePro}); // Send professional data
    } catch (error) {
        console.log("Error finding posts count by id:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
