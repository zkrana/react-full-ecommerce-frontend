// Import the query function from "@/utils/db"
import { query } from "../../../utils/db";

// GET request handler for retrieving categories with product count
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    let categoryData;

    if (categoryId) {
      // Fetch a specific category by ID with product count
      categoryData = await query({
        query: `
          SELECT c.*, COUNT(p.id) as product_count
          FROM categories c
          LEFT JOIN products p ON c.id = p.category_id
          WHERE c.id = ?
          GROUP BY c.id
        `,
        values: [categoryId],
      });

      if (categoryData.length === 0) {
        // Category not found
        return new Response(JSON.stringify({ error: "Category not found" }), {
          status: 404,
        });
      }
    } else {
      // Fetch all categories with product count
      categoryData = await query({
        query: `
          SELECT c.*, COUNT(p.id) as product_count
          FROM categories c
          LEFT JOIN products p ON c.id = p.category_id
          GROUP BY c.id
        `,
      });
    }

    return new Response(JSON.stringify(categoryData), { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// Default handler
export default async function handler(req, res) {
  const allowedMethods = ["GET"];

  if (!allowedMethods.includes(req.method)) {
    return res.status(405).end();
  }

  try {
    const result = await module.exports[req.method](req);

    return new Response(result.body, {
      status: result.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in handler:", error);
    return handleError(error, req);
  }
}

// Error handling function
async function handleError(error, request) {
  console.error(error);

  console.error("Request Method:", request.method);
  console.error("Request URL:", request.url);
  console.error("Request Headers:", request.headers);

  return new Response(JSON.stringify("Internal Server Error"), {
    status: 500,
  });
}
