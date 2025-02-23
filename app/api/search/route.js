import { NextResponse } from "next/server";
import { searchUsers, searchPosts, likeProCountsById } from "../db/queries";

export const config = {
  runtime: "edge",
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const likeCount = await likeProCountsById(userId);
    if (likeCount === null) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ likePro: likeCount }); // Send like count data
  } catch (error) {
    console.error("Error fetching like count:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request){
    console.log("Here")
    const { searchTerm, type } = await request.json();
    if (!searchTerm) {
      return new Response(JSON.stringify({ error: "Search term is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    let results;
    if (type === "account") {
      results = await searchUsers(searchTerm);
    } else if (type === "post") {
      results = await searchPosts(searchTerm);
    } else {
      return new Response(JSON.stringify({ error: "Invalid search type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

}