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
      from post 
      WHERE LOWER(title) LIKE ${"%" + searchTerm.toLowerCase() + "%"}
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

// Query to get status of register like and permission
export async function getStatusRL(userId1, userId2) {
  try {
    // Check if athlete is registered with this professional
    const register = await sql`
      SELECT * 
      FROM register 
      WHERE athlete_id = ${userId1} 
        AND professional_id = ${userId2}
    `;

    // Check if athlete has liked the professional
    const like = await sql`
      SELECT * 
      FROM like_pro 
      WHERE athlete_id = ${userId1} 
        AND professional_id = ${userId2}
    `;

    // Get the user type of the professional
    const professionalData = await sql`
      SELECT user_type
      FROM users
      WHERE user_id = ${userId2}
    `;

    if (professionalData.length === 0) {
      throw new Error("Professional not found");
    }

    const professionalType = professionalData[0].user_type; // "Trainer" or "Nutritionist"

    // Count how many trainers and nutritionists the athlete has registered with
    const athleteRegistration = await sql`
      SELECT COUNT(*) AS trainer_count 
      FROM register r
      JOIN users u ON r.professional_id = u.user_id
      WHERE r.athlete_id = ${userId1} 
        AND u.user_type = 'Trainer'
    `;

    const athleteNutritionistRegistration = await sql`
      SELECT COUNT(*) AS nutritionist_count 
      FROM register r
      JOIN users u ON r.professional_id = u.user_id
      WHERE r.athlete_id = ${userId1} 
        AND u.user_type = 'Nutritionist'
    `;

    // Count how many athletes the professional has registered
    const professionalAthleteCount = await sql`
      SELECT COUNT(*) AS count
      FROM register 
      WHERE professional_id = ${userId2}
    `;

    // Ensure the athlete can only have 1 trainer and 1 nutritionist
    const canRegister =
      (professionalType === "Trainer" && athleteRegistration[0].trainer_count === 0) || 
      (professionalType === "Nutritionist" && athleteNutritionistRegistration[0].nutritionist_count === 0);

    // Ensure professional has fewer than 10 athletes
    const canProfessionalRegister = professionalAthleteCount[0].count < 10;

    // Final permission check
    const permission = canRegister && canProfessionalRegister;

    return {
      isRegistered: register.length > 0,
      isLiked: like.length > 0,
      permission
    };
  } catch (error) {
    console.error("Error fetching register status by user_id:", error);
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

// Query to fetch all posts by id
export async function fetchPostsById(id) {
  try {
    const posts = await sql`
      SELECT * 
      FROM post
      WHERE post_visibility = 'Public'
        AND professional_id = ${id}
    `;
    return posts;
  } catch (error) {
    console.error("Error fetching posts by id:", error);
    throw error;
  }
}

export async function PostCreate(formData) {
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
}

export async function fetchPostDetails(id) {
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

    return responseData;
}

export async function fetchCommentsByPostId(post_id) {
  const comments = await sql`
        SELECT c.comment_id, c.content, c.post_id, u.user_id, u.user_name
        FROM "Comment" c
        JOIN users u ON c.user_id = u.user_id
        WHERE c.post_id = ${post_id}
        ORDER BY c.comment_id DESC;
      `;
  
      return comments;
}

export async function createComment(email, post_id, content) {
  if (!email || !post_id || !content) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
      }
  
      const user = await findUserByEmail(email);
      const user_id = user.user_id;
  
      const result = await sql`
        INSERT INTO "Comment" (user_id, post_id, content)
        VALUES (${user_id}, ${post_id}, ${content})
        RETURNING comment_id, content, post_id, user_id;
      `;
  
      const comment = result[0];
      comment.user_name = user.user_name
      
      return { message: "Comment added", comment: result[0] };
}