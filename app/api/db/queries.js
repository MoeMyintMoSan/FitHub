import sql from "../db/config";

// Search Users by Name
export async function searchUsers(searchTerm) {
  console.log("searchTerm", sql);
  try {
    const response = await sql`
      SELECT * 
      FROM users u
      WHERE LOWER(u.user_name) LIKE ${"%" + searchTerm.toLowerCase() + "%"}
    `;
    return response;
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
      FROM post 
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

    const userId = newUser[0]?.user_id;

    if (!userId) {
      throw new Error("User ID not returned after insertion");
    }

    // Insert into another table using the user_id
    await sql`
      INSERT INTO athlete (athlete_id)
      VALUES (${userId});
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

    if (!updatedUser.length) {
      throw new Error("User update failed or user not found.");
    }

    await sql`
      DELETE FROM athlete
      WHERE athlete_id = ${id}; 
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

// Query to find email by user_id
export async function findEmailById(id) {
  try {
    const email = await sql`
      SELECT email 
      FROM users 
      WHERE user_id = ${id}
    `;
    return email.length > 0 ? email[0] : null;
  } catch (error) {
    console.error("Error finding email by user_id:", error);
    throw error;
  }
}

// Query to find current user by email
export async function findCurrentUserByEmail(email) {
  try {
    const currentUser = await sql`
      SELECT user_id, user_name, email, user_type
      FROM users 
      WHERE email = ${email}
    `;
    return currentUser.length > 0 ? currentUser[0] : null;
  } catch (error) {
    console.error("Error finding current user by email:", error);
    throw error;
  }
}

// Example implementation of getStatusRL function
export async function getStatusRL(userId1, userId2) {
  try {

    const register = await sql`
      SELECT * 
      FROM register 
      WHERE athlete_id = ${userId1} 
        AND professional_id = ${userId2}
    `;

    const like = await sql`
      SELECT * 
      FROM like_pro 
      WHERE athlete_id = ${userId1} 
        AND professional_id = ${userId2}
    `;
    
    const status = {
      isRegistered: register.length > 0,
      isLiked: like.length > 0,
    };

    return status;
  }
  catch (error) {
    console.error("Error finding register status by user_id:", error);
    throw error;
  }
}

// Query to register an athlete to a professional
export async function registerAtoP(athleteId, professionalId) {
  try {
    const register = await sql`
      INSERT INTO register (athlete_id, professional_id)
      VALUES (${athleteId}, ${professionalId})
      RETURNING *;
    `;
    return register.length > 0 ? register[0] : null;
  } catch (error) {
    console.error("Error registering athlete to professional:", error);
    throw error;
  }
}

// Query to unregister an athlete from a professional
export async function unregisterAtoP(athleteId, professionalId) {
  try {
    const unregister = await sql`
      DELETE FROM register 
      WHERE athlete_id = ${athleteId} 
        AND professional_id = ${professionalId}
      RETURNING *;
    `;
    return unregister.length > 0 ? unregister[0] : null;
  } catch (error) {
    console.error("Error unregistering athlete from professional:", error);
    throw error;
  }
}

// Query to like a professional by an athlete
export async function likeAtoP(athleteId, professionalId) {
  try {
    const like = await sql`
      INSERT INTO like_pro (athlete_id, professional_id)
      VALUES (${athleteId}, ${professionalId})
      RETURNING *;
    `;
    return like.length > 0 ? like[0] : null;
  } catch (error) {
    console.error("Error liking professional by athlete:", error);
    throw error;
  }
}

// Query to unlike a professional by an athlete
export async function unlikeAtoP(athleteId, professionalId) {
  try {
    const unlike = await sql`
      DELETE FROM like_pro 
      WHERE athlete_id = ${athleteId} 
        AND professional_id = ${professionalId}
      RETURNING *;
    `;
    return unlike.length > 0 ? unlike[0] : null;
  } catch (error) {
    console.error("Error unliking professional by athlete:", error);
    throw error;
  }
}