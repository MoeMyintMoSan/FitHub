import { searchUsers, searchPosts } from "../db/queries";

export const config = {
  runtime: "edge",
};

// export default async function handler(req) {
//     console.log('here')
//     console.log(req.method)
//   if (req.method !== "POST") {
//     return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
//       status: 405,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   try {
//     const { searchTerm, type } = await req.json();

//     if (!searchTerm) {
//       return new Response(JSON.stringify({ error: "Search term is required" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     let results;
//     if (type === "account") {
//       results = await searchUsers(searchTerm);
//     } else if (type === "post") {
//       results = await searchPosts(searchTerm);
//     } else {
//       return new Response(JSON.stringify({ error: "Invalid search type" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify(results), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error in search API:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }


export async function POST(requestt){
    console.log("Here")
    const { searchTerm, type } = await requestt.json();
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