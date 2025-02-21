import { NextResponse } from "next/server";
import { getStatusRL } from "../../../db/queries";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId1 = searchParams.get("userId1");
    const userId2 = searchParams.get("userId2");

    if (!userId1 || !userId2) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        const status = await getStatusRL(userId1, userId2);
        if (!status) {
          return NextResponse.json({ error: "Status not found" }, { status: 404 });
        }
    
        return NextResponse.json(status); // Send status data
      } catch (error) {
        console.log("Error finding register status by user_id:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}