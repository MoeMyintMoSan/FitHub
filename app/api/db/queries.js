import sql from "../db/config";

// Search Users by Name
export async function searchUsers(searchTerm) {

    console.log("searchTerm",sql)
  try {
    const response = await sql`
      SELECT * 
      FROM users u
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

// Query to fetch accounts based on user type
export async function fetchAccountsByUserType(userId) {
  try {
    // Fetch the current user's type
    const user = await sql`
      SELECT user_type 
      FROM users 
      WHERE user_id = ${userId}
    `;

    if (user.length === 0) {
      throw new Error("User not found");
    }

    const userType = user[0].user_type;

    let accounts;
    if (userType === "Athlete") {
      // Fetch professionals paired with the athlete in private_feed
      accounts = await sql`
        SELECT u.user_id, u.user_name, u.user_type, p.bio 
        FROM users u
        JOIN professional p ON u.user_id = p.professional_id
        JOIN private_feed pf ON p.professional_id = pf.professional_id
        WHERE pf.athlete_id = ${userId}
      `;
    } else if (userType === "Trainer" || userType === "Nutritionist") {
      // Fetch athletes paired with the professional in private_feed
      accounts = await sql`
        SELECT u.user_id, u.user_name, u.user_type 
        FROM users u
        JOIN athlete a ON u.user_id = a.athlete_id
        JOIN private_feed pf ON a.athlete_id = pf.athlete_id
        WHERE pf.professional_id = ${userId}
      `;
    } else {
      throw new Error("Invalid user type");
    }

    return accounts;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
} 


// Query to find a professional bio by user_id
export async function findBioById(id) {
  try {
    const bio = await sql`
      SELECT bio 
      FROM professional 
      WHERE professional_id = ${id}
    `;
    return bio.length > 0 ? bio[0] : null;
  } catch (error) {
    console.error("Error finding professional bio by user_id:", error);
    throw error;
  }
}

// Query to find a professional's post count by user_id
export async function postCountsById(id) {
  try {
    const posts = await sql`
      SELECT count(*)
      FROM post 
      WHERE professional_id = ${id}
    `;
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error finding professional bio by user_id:", error);
    throw error;
  }
}

// Query to find registered athletes count by user_id
export async function registeredCountsById(id) {
  try {
    const registered = await sql`
      SELECT count(*)
      FROM register 
      WHERE professional_id = ${id}
    `;
    return registered.length > 0 ? registered[0] : null;
  } catch (error) {
    console.error("Error finding professional's registered athletes count by user_id:", error);
    throw error;
  }
}

// Query to find like_pro count by user_id
export async function likeProCountsById(id) {
  try {
    const proLike = await sql`
      SELECT count(*)
      FROM like_pro
      WHERE professional_id = ${id}
    `;
    return proLike.length > 0 ? proLike[0] : null;
  } catch (error) {
    console.error("Error finding professional's like count by user_id:", error);
    throw error;
  }
}

// Query to update a user info by user_id
export async function updateUserById(id, userData) {
  const { user_name, email, user_password, user_type, date_of_birth, height, weight, body_description, diet_description, bio } = userData;
  try {
    const updatedUser = await sql`
      UPDATE users
      SET
        user_name = ${user_name},
        email = ${email},
        user_password = ${user_password},
        height = ${height},
        weight = ${weight},
        body_description = ${body_description},
        diet_description = ${diet_description}
      WHERE user_id = ${id}
      RETURNING *;
    `;

    if (bio) {
      await sql`
        UPDATE professional
        SET bio = ${bio}
        WHERE professional_id = ${id};
      `;
    }

    return updatedUser.length > 0 ? updatedUser[0] : null;
  } catch (error) {
    console.error("Error updating user by user_id:", error);
    throw error;
  }
}

// Query to update user type by user_id and insert professional info
export async function updateToProfessionalById(id, type) {
  try {
    const updatedUser = await sql`
      UPDATE users
      SET user_type = ${type}
      WHERE user_id = ${id}
      RETURNING *;
    `;

    await sql`
      INSERT INTO professional (professional_id, bio)
      VALUES (${id}, ${"No Bio Yet"});
    `;

    return updatedUser.length > 0 ? updatedUser[0] : null;
  } catch (error) {
    console.error("Error updating user to professional by user_id:", error);
    throw error;
  }
}