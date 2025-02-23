import { fetchPostDetails } from "../../db/queries";
export async function GET(request, { params }) {
  const resolvedParams = await params;
  console.log("Resolved Params:", resolvedParams); // Debugging log
  const { id } = resolvedParams;

  try {
    const post = await fetchPostDetails(id);
    return new Response(JSON.stringify(post), { status: 200 });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}