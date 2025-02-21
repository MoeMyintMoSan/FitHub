import { NextResponse } from "next/server";
import sql from "../../db/config";
import { findUserByEmail } from "../../db/queries";

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

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const title = formData.get("title");
    const content = formData.get("content");
    const post_visibility = formData.get("post_visibility");
    const image = formData.get("image");
    const details = JSON.parse(formData.get("details"));
    const athlete_id = formData.get("referenced_athletes")[1];

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

    await sql`
      INSERT INTO private_feed (athlete_id, professional_id, post_id)
      VALUES (${athlete_id}, ${user_id}, ${postId});
    `;

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