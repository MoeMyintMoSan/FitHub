import { NextResponse } from "next/server";
import sql from "../db/config";
import { PostCreate } from "../db/queries";


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
  const formData = await req.formData();
    
  try {
    await PostCreate(formData);
    return NextResponse.json({ status: 201 });
    
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}