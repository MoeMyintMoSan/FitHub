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
      SELECT post_id
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

// Query to find a user by email
export async function findUserByEmail(email) {
  try {
    const user = await sql`
      SELECT * 
      FROM users 
      WHERE email = ${email}
    `;
    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}

// Query to create a new user
export async function createUser(userData) {
  const { user_name, email, user_password, user_type, date_of_birth, height, weight, body_description, diet_description } = userData;
  try {
    const newUser = await sql`
      INSERT INTO users 
        (user_name, email, user_password, user_type, date_of_birth, height, weight, body_description, diet_description)
      VALUES 
        (${user_name}, ${email}, ${user_password}, ${user_type}, ${date_of_birth}, ${height}, ${weight}, ${body_description}, ${diet_description})
      RETURNING *;
    `;
    return newUser[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Query to validate user credentials
export async function validateUserCredentials(email, password) {
  try {
    const user = await sql`
      SELECT * 
      FROM users 
      WHERE email = ${email} 
        AND user_password = ${password}
    `;
    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error validating user credentials:", error);
    throw error;
  }
}
