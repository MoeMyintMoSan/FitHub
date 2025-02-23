-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    height NUMERIC(5, 2),
    weight NUMERIC(5, 2),
    body_description TEXT,
    diet_description TEXT,
    CONSTRAINT User_user_type_check CHECK (
        user_type IN ('Athlete', 'Trainer', 'Nutritionist')
    )
);

-- Indexes for Users Table
CREATE UNIQUE INDEX User_pkey ON users (user_id);
CREATE UNIQUE INDEX User_email_key ON users (email);

-- Athlete Table
CREATE TABLE Athlete (
    athlete_id INT UNIQUE NOT NULL,
    FOREIGN KEY (athlete_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Professional Table
CREATE TABLE Professional (
    professional_id INT UNIQUE NOT NULL,
    bio TEXT,
    FOREIGN KEY (professional_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Post Table (updated)
CREATE TABLE Post (
    post_id SERIAL PRIMARY KEY,
    professional_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    image VARCHAR(255),
    content_type VARCHAR(20) CHECK (content_type IN ('Trainer', 'Nutritionist')) NOT NULL,
    post_visibility VARCHAR(20) CHECK (post_visibility IN ('Public', 'Private')) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (professional_id) REFERENCES Professional(professional_id) ON DELETE CASCADE
);

-- Comment Table (updated)
CREATE TABLE "Comment" (
    comment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
);

-- like_post Table (updated)
CREATE TABLE like_post (
    like_post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
);

-- Nutritionist_Post_Details Table
CREATE TABLE Nutritionist_Post_Details (
    nutritionist_post_detail_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    food VARCHAR(255) NOT NULL,
    calories INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
);

-- Trainer_Post_Details Table
CREATE TABLE Trainer_Post_Details (
    trainer_post_detail_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    exercise VARCHAR(255) NOT NULL,
    reps INT NOT NULL,
    sets INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
);

-- Private_Feed Table (updated)
CREATE TABLE Private_Feed (
    athlete_id INT NOT NULL,
    professional_id INT NOT NULL,
    post_id INT NOT NULL UNIQUE,
    PRIMARY KEY (athlete_id, professional_id, post_id),
    FOREIGN KEY (athlete_id) REFERENCES Athlete(athlete_id) ON DELETE CASCADE,
    FOREIGN KEY (professional_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
);

-- Register Table (updated)
CREATE TABLE Register (
    athlete_id INT NOT NULL,
    professional_id INT NOT NULL,
    PRIMARY KEY (athlete_id, professional_id),
    FOREIGN KEY (athlete_id) REFERENCES Athlete(athlete_id) ON DELETE CASCADE,
    FOREIGN KEY (professional_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- like_pro Table
CREATE TABLE like_pro (
    professional_id INT NOT NULL,
    athlete_id INT NOT NULL,
    PRIMARY KEY (professional_id, athlete_id),
    FOREIGN KEY (professional_id) REFERENCES Professional(professional_id) ON DELETE CASCADE,
    FOREIGN KEY (athlete_id) REFERENCES Athlete(athlete_id) ON DELETE CASCADE
);

--Creating New User(Signing Up)
INSERT INTO users 
    (user_name, email, user_password, user_type, date_of_birth, height, weight, body_description, diet_description)
VALUES 
    (${user_name}, ${email}, ${user_password}, ${user_type}, ${date_of_birth}, ${height}, ${weight}, ${body_description}, ${diet_description})
RETURNING *;

INSERT INTO athlete (athlete_id)
VALUES (${userId});

--Validate User Credentials (Signing In)
SELECT * 
FROM users 
WHERE email = ${email} 
AND user_password = ${password};

--Find user by email
SELECT * 
FROM users 
WHERE email = ${email}

--find current user by email
SELECT user_id, user_name, email, user_type
FROM users 
WHERE email = ${email}

--find email by user_id
SELECT email 
FROM users 
WHERE user_id = ${id}


--Fetching Accounts Based on user type
SELECT user_type 
FROM users 
WHERE user_id = ${userId}

--if user type is athlete
SELECT u.user_id, u.user_name, u.user_type, p.bio 
FROM users u
JOIN professional p ON u.user_id = p.professional_id
JOIN register r ON p.professional_id = r.professional_id
WHERE r.athlete_id = ${userId}

--if user type is trainer or nutritionist
SELECT u.user_id, u.user_name, u.user_type 
FROM users u
JOIN athlete a ON u.user_id = a.athlete_id
JOIN register r ON a.athlete_id = r.athlete_id
WHERE r.professional_id = ${userId}

--Search Users Name
SELECT * 
FROM users u
WHERE LOWER(u.user_name) LIKE ${"%" + searchTerm.toLowerCase() + "%"}

--Search Posts by title of the post
SELECT post_id
from post 
WHERE LOWER(title) LIKE ${"%" + searchTerm.toLowerCase() + "%"}
    AND post_visibility = 'Public'

--find a professional's post count by user_id
SELECT count(*)
FROM post 
WHERE professional_id = ${id}

--find registered athlete count by user_id
SELECT count(*)
FROM register 
WHERE professional_id = ${id}

--like_pro count by user_id
SELECT count(*)
FROM like_pro
WHERE professional_id = ${id}

--update user info by user_id
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

--update bio
UPDATE professional
SET bio = ${bio}
WHERE professional_id = ${id};

--update user_type and insert professional info
UPDATE users
SET user_type = ${type}
WHERE user_id = ${id}
RETURNING *;

DELETE FROM athlete
WHERE athlete_id = ${id}; 

DELETE FROM private_feed
WHERE athlete_id = ${id};

DELETE FROM register
WHERE athlete_id = ${id};

INSERT INTO professional (professional_id, bio)
VALUES (${id}, ${"No Bio Yet"}); 

--find bio by user_id
SELECT bio 
FROM professional 
WHERE professional_id = ${id}

--Check if athlete is registered with this professional
SELECT * 
FROM register 
WHERE athlete_id = ${userId1} 
    AND professional_id = ${userId2}

--Check if athlete has liked the professional
SELECT * 
FROM like_pro 
WHERE athlete_id = ${userId1} 
    AND professional_id = ${userId2}

--Get the user type of the professional
SELECT user_type
FROM users
WHERE user_id = ${userId2}

--Count how many trainers and nutritionists the athlete has registered with
SELECT COUNT(*) AS trainer_count 
FROM register r
JOIN users u ON r.professional_id = u.user_id
WHERE r.athlete_id = ${userId1} 
    AND u.user_type = 'Trainer'

SELECT COUNT(*) AS nutritionist_count 
FROM register r
JOIN users u ON r.professional_id = u.user_id
WHERE r.athlete_id = ${userId1} 
    AND u.user_type = 'Nutritionist'

--Count how many athletes the professional has registered
SELECT COUNT(*) AS count
FROM register 
WHERE professional_id = ${userId2}

--Athlete Register to Pro
INSERT INTO register (athlete_id, professional_id)
VALUES (${athleteId}, ${professionalId})
RETURNING *;

--unregister an athlete from a professional and delete related data
DELETE FROM register 
WHERE athlete_id = ${athleteId} 
    AND professional_id = ${professionalId}
RETURNING *;

DELETE FROM post
WHERE post_id IN (
    SELECT post_id FROM private_feed 
    WHERE athlete_id = ${athleteId} 
    AND professional_id = ${professionalId}
);

--atlhete like a professional
INSERT INTO like_pro (athlete_id, professional_id)
VALUES (${athleteId}, ${professionalId})
RETURNING *;

--athlete unlike a professional
DELETE FROM like_pro 
WHERE athlete_id = ${athleteId} 
    AND professional_id = ${professionalId}
RETURNING *;

--fetch all posts 
SELECT post.post_id FROM "post"
WHERE post.post_visibility = 'Public'

--fetch posts by pro_id
SELECT * 
FROM post
WHERE post_visibility = 'Public'
    AND professional_id = ${id}

--fetch post details by post_id
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

--crete a post
--first insert into post
INSERT INTO Post (professional_id, title, content, image, content_type, post_visibility)
VALUES (${user_id}, ${title}, ${content}, ${image}, ${content_type}, ${post_visibility})
RETURNING post_id;
--if post type is Trainer
INSERT INTO trainer_post_details (post_id, exercise, reps, sets)
VALUES (${postId}, ${detail.exercise}, ${detail.reps}, ${detail.sets});
--if post type is Nutritionist
INSERT INTO nutritionist_post_details (post_id, food, calories)
VALUES (${postId}, ${detail.food}, ${detail.calories});


--fetch comments by post_id
SELECT c.comment_id, c.content, c.post_id, u.user_id, u.user_name
FROM "Comment" c
JOIN users u ON c.user_id = u.user_id
WHERE c.post_id = ${post_id}
ORDER BY c.comment_id DESC

--create a comment
INSERT INTO "Comment" (user_id, post_id, content)
VALUES (${user_id}, ${post_id}, ${content})
RETURNING comment_id, content, post_id, user_id;

--fetch likes by post_id
SELECT * FROM like_post WHERE post_id = ${post_id} AND user_id = ${user_id};

--like a post
INSERT INTO like_post (post_id, user_id)
VALUES (${id}, ${user_id})
RETURNING *;

--unlike a post
DELETE FROM like_post
WHERE post_id = ${id} AND user_id = ${user_id};

--fetch private feed associated with the current user and the intended account
SELECT pf.post_id
FROM private_feed pf
WHERE (pf.athlete_id = ${currentUserId} AND pf.professional_id = ${otherUserId})
    OR (pf.athlete_id = ${otherUserId} AND pf.professional_id = ${currentUserId})

--post to private feed
--first insert into post
INSERT INTO Post (professional_id, title, content, image, content_type, post_visibility)
VALUES (${user_id}, ${title}, ${content}, ${image}, ${content_type}, ${post_visibility})
RETURNING post_id;
--insert into private feed
INSERT INTO private_feed (athlete_id, professional_id, post_id)
VALUES (${athlete_id}, ${user_id}, ${postId});
--if post type is Trainer
INSERT INTO trainer_post_details (post_id, exercise, reps, sets)
VALUES (${postId}, ${detail.exercise}, ${detail.reps}, ${detail.sets});
--if post type is Nutritionist
INSERT INTO nutritionist_post_details (post_id, food, calories)
VALUES (${postId}, ${detail.food}, ${detail.calories});


