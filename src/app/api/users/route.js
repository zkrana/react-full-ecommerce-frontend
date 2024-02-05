import { query } from "../../../utils/db";

// GET request handler
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    let customerData;

    if (customerId) {
      customerData = await query({
        query: "SELECT * FROM customers WHERE id = ?",
        values: [customerId],
      });
    } else {
      customerData = await query({
        query: "SELECT * FROM customers",
      });
    }

    return new Response(JSON.stringify(customerData), { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
}

// DELETE request handler
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    if (customerId) {
      const result = await query({
        query: "DELETE FROM customers WHERE id = ?",
        values: [customerId],
      });

      return new Response(JSON.stringify(result), { status: 200 });
    } else {
      return new Response(JSON.stringify("Customer ID not found"), {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
}

// Default handler
export default async function handler(req, res) {
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];

  if (!allowedMethods.includes(req.method)) {
    return res.status(405).end();
  }

  try {
    return await module.exports[req.method](req);
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

  return new Response("Internal Server Error", {
    status: 500,
  });
}
