import sql from "@/app/api/db/config";
import { findUserByEmail } from "@/app/api/db/queries";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get("postId");
    const email = searchParams.get("email");

    if (!post_id || !email) {
      console.error("Missing postId or email");
      return new Response(JSON.stringify({ error: "Missing postId or email" }), { status: 400 });
    }

    // Fetch user ID from email
    const user = await findUserByEmail(email);
    if (!user) {
      console.error(`User not found for email: ${email}`);
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const user_id = user.user_id;

    // Check if the like exists
    const likes = await sql`
      SELECT * FROM like_post WHERE post_id = ${post_id} AND user_id = ${user_id};
    `;

    return new Response(JSON.stringify({ liked: likes.length > 0 }), { status: 200 });
  } catch (error) {
    console.error("🚨 Server Error:", error); // Log the error
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
