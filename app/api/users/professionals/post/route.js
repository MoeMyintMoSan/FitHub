import { NextResponse } from "next/server";
import { fetchPostsById } from "../../../db/queries";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("user_id");
    
    if (!id) {
        return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    try {
        const post = await fetchPostsById(id);
        if (!post) {
            return NextResponse.json({ error: "Posts not found" }, { status: 404 });
        }

        return NextResponse.json(post); // Send posts
    } catch (error) {
        console.log("Error finding posts by id:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
