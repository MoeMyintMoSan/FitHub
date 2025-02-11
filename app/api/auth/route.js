import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from "../db/queries";
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, user_password, action, user_name, user_type, date_of_birth, height, weight, body_description, diet_description } = body;
    console.log("body",body)

    if (action === 'signup') {
      // Handle signup
      try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
          return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = user_password; // No hashing applied

        // Create new user
        const newUser = await createUser({
          user_name,
          email,
          user_password: hashedPassword,
          user_type,
          date_of_birth,
          height,
          weight,
          body_description,
          diet_description,
        });

        return NextResponse.json({ user: newUser }, { status: 201 });
      } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
      }
    } else if (action === 'signin') {
      // Handle signin
      try {
        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Validate password
        if (user_password !== user.user_password) {
          console.log("password",user_password)
          return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({ user }, { status: 200 });
      } catch (error) {
        console.error("Error signing in:", error);
        return NextResponse.json({ error: "Error signing in" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}