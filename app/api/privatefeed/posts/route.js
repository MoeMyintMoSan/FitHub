import { NextResponse } from "next/server";
import sql from "../../db/config";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const currentUserId = searchParams.get("currentUserId");
  const otherUserId = searchParams.get("otherUserId");

  try {
    // Fetch posts associated with the current user and the clicked account
    const posts = await sql`
      SELECT pf.post_id
      FROM private_feed pf
      WHERE (pf.athlete_id = ${currentUserId} AND pf.professional_id = ${otherUserId})
         OR (pf.athlete_id = ${otherUserId} AND pf.professional_id = ${currentUserId})
    `;

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}