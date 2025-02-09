import sql from "@/app/api/db/config";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  console.log("Resolved Params:", resolvedParams); // Debugging log
  const { id } = resolvedParams;

  try {
    const rows = await sql`
  SELECT 
    post.*,
    users.user_name,
    trainer_post_details.*,
    trainer_post_details.*
  FROM post
  JOIN professional ON post.professional_id = professional.professional_id
  JOIN users ON professional.user_id = users.user_id
  LEFT JOIN trainer_post_details
      ON post.content_type = 'Trainer' AND post.post_id = trainer_post_details.post_id
  LEFT JOIN nutritionist_post_details 
      ON post.content_type = 'Nutritionist' AND post.post_id = nutritionist_post_details.post_id
  WHERE post.post_id = ${id};
`;
    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
