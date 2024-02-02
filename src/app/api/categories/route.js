import { NextResponse } from "next/server";
import mysql from "../../../utils/mysql";

// Check the database connection when the module is imported
(async () => {
  try {
    const connection = await mysql.getConnection();
    console.log("Database connection successful!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

export async function GET() {
  try {
    // Query the database
    const results = await new Promise((resolve, reject) => {
      mysql.query("SELECT * FROM categories", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // Send a JSON response to the client
    return new NextResponse({
      status: 200,
      body: JSON.stringify(results), // Convert results to JSON
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    // Handle the error and send an appropriate response
    return new NextResponse({
      status: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
