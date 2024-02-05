// api/auth/register.js
import { query } from "../../../../utils/db";
import bcrypt from "bcrypt";

// POST handler for user registration
export async function postHandler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end(); // Method Not Allowed
    }

    const { username, password, email } = req.body;

    // Get the client's IP address
    const ip_address =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Basic input validation
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database along with IP address
    const results = await query(
      "INSERT INTO customers (ip_address, username, password, email) VALUES (?, ?, ?, ?)",
      [ip_address, username, hashedPassword, email]
    );

    console.log("User registered successfully:", results);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Exporting the postHandler function
export { postHandler };
