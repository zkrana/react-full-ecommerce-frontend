// Import necessary modules
import { query } from "../../../../utils/db";
import bcrypt from "bcryptjs";

// POST request handler
export async function POST(request) {
  try {
    const requestData = await request.json();

    // Validate and extract user input
    const { username, email, password } = validateUserData(requestData);

    // Check if username or email already exists
    const existingUser = await query({
      query: "SELECT * FROM customers WHERE username = ? OR email = ?",
      values: [username, email],
    });

    if (existingUser.length > 0) {
      throw new Error("Username or email already exists");
    }

    // Hash password securely using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertResult = await query({
      query:
        "INSERT INTO customers (ip_address, username, password, email, photo, request_time) VALUES (?, ?, ?, ?, ?, ?)",
      values: [
        request.headers.get("x-forwarded-for") || request.client.remoteAddress,
        username,
        hashedPassword,
        email,
        "",
        new Date().toISOString(),
      ],
    });

    return new Response(
      JSON.stringify({
        status: "success",
        message: "User registered successfully",
        userId: insertResult.insertId,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in POST request:", error);

    // Log additional information
    console.error("Request Method:", request.method);
    console.error("Request URL:", request.url);
    console.error("Request Headers:", request.headers);

    return new Response("Internal Server Error: " + error.message, {
      status: 500,
    });
  }
}
