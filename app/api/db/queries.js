import sql from "../db/config";

// Search Users by Name
export async function searchUsers(searchTerm) {

    console.log("searchTerm",sql)
  try {
    // console.log("searchTerm",searchTerm)
    // const result = await sql`
    //   SELECT *
    //   FROM User 
    //   WHERE LOWER(user_name) LIKE ${"%" + searchTerm.toLowerCase() + "%"}
    // `;
    // console.log("result",result)
    // return result;
    const response = await sql`
      SELECT * 
      FROM users u
      JOIN professional p ON u.user_id = p.user_id
      WHERE LOWER(u.user_name) LIKE ${"%" + searchTerm.toLowerCase() + "%"}
    `;
    return response
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Search Posts by Content
export async function searchPosts(searchTerm) {
  try {
    const response = await sql`
      SELECT *
      from post 
      WHERE LOWER(content) LIKE ${"%" + searchTerm.toLowerCase() + "%"}
        AND post_visibility = 'Public'
    `;
    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
