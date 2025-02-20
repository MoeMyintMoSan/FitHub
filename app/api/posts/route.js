import { NextResponse } from "next/server";
import sql from "@/app/api/db/config";
import { findUserByEmail } from "../db/queries";


export async function GET(req) {
  try{
    const { searchParams } = new URL(req.url)
    
    const posts = await sql`
      SELECT post.post_id FROM "post"
      WHERE post.post_visibility = 'Public'
    ` 
    return NextResponse.json(posts, { status: 200 });
  }
  catch(error){
    console.error("Error fetching posts:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const title = formData.get("title");
    const content = formData.get("content");
    const post_visibility = formData.get("post_visibility");
    const image = formData.get("image");
    const details = JSON.parse(formData.get("details"));


    const user = await findUserByEmail(email);
    const user_id = user.user_id;
    const content_type = user.user_type;

    // Insert into Post table
    const postResult = await sql`
      INSERT INTO Post (professional_id, title, content, image, content_type, post_visibility)
      VALUES (${user_id}, ${title}, ${content}, ${image}, ${content_type}, ${post_visibility})
      RETURNING post_id;
    `;

    const postId = postResult[0].post_id;

    // Insert into corresponding detail table
    if (content_type === "Trainer") {
      for (const detail of details) {
        await sql`
          INSERT INTO trainer_post_details (post_id, exercise, reps, sets)
          VALUES (${postId}, ${detail.exercise}, ${detail.reps}, ${detail.sets});
        `;
      }
    } else if (content_type === "Nutritionist") {
      for (const detail of details) {
        await sql`
          INSERT INTO nutritionist_post_details (post_id, food, calories)
          VALUES (${postId}, ${detail.food}, ${detail.calories});
        `;
      }
    }

    return NextResponse.json({ message: "Post created successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}