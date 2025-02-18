import sql from "@/api/db/config";
import { findUserByEmail } from "../../db/queries";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  console.log("Resolved Params:", resolvedParams); // Debugging log
  const { id } = resolvedParams;

  try {
    const rows = await sql`
      SELECT 
        post.*,
        users.user_name,
        trainer_post_details.exercise,
        trainer_post_details.reps,
        trainer_post_details.sets,
        nutritionist_post_details.food,
        nutritionist_post_details.calories
      FROM post
      JOIN users ON post.professional_id = users.user_id
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

    // **Step 1: Extract post data from the first row**
    const { 
      post_id, professional_id, title, content, image, content_type, 
      post_visibility, created_date, user_name 
    } = rows[0];

    // **Step 2: Group exercise/food details**
    const details = rows.map(row => ({
      ...(content_type === "Trainer"
        ? { exercise: row.exercise, reps: row.reps, sets: row.sets }
        : { food: row.food, calories: row.calories }
      )
    })).filter(detail => Object.values(detail).some(value => value !== null));

    // **Step 3: Format the final response**
    const responseData = {
      post_id,
      professional_id,
      title,
      content,
      image,
      content_type,
      post_visibility,
      created_date,
      user_name,
      details,  // Contains an array of exercises or foods
    };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}