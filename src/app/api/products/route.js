// Import the query function from "@/utils/db"
import { query } from "../../../utils/db";

// GET request handler for retrieving products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    let productData;

    if (productId) {
      // Fetch a specific product by ID
      const result = await query({
        query: "SELECT * FROM products WHERE id = ?",
        values: [productId],
      });

      productData = result[0]; // Extract the first result from the array
    } else {
      // Fetch all products
      productData = await query({
        query: "SELECT * FROM products",
      });
    }

    return new Response(JSON.stringify(productData), { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
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
