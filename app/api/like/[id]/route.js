import sql from "@/app/api/db/config";
import { findUserByEmail } from "@/app/api/db/queries";

// POST - Like a post
export async function POST(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const { email } = await request.json();

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const user_id = user.user_id;

    const like = await sql`
      INSERT INTO like_post (post_id, user_id)
      VALUES (${id}, ${user_id})
      RETURNING *;
    `;

    return new Response(JSON.stringify({ message: "Post liked successfully", like }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE - Unlike a post
export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const { email } = await request.json();

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const user_id = user.user_id;

    const unlike = await sql`
      DELETE FROM like_post
      WHERE post_id = ${id} AND user_id = ${user_id};
    `;

    return new Response(JSON.stringify({ message: "Post unliked successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error unliking post:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}