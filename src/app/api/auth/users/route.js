// src/app/api/customers/route.js
import { query } from "@/utils/db";

export async function GET(request) {
  try {
    const customers = await query({
      query: "SELECT * FROM customers",
      values: [],
    });

    let data = JSON.stringify(customers);
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: "Internal Server Error",
      })
    );
  }
}

export async function POST(request) {
  try {
    const { username, password, email, photo } = await request.json();

    // Get the client's IP address
    const ip_address =
      request.headers.get("x-forwarded-for") ||
      request.connection.remoteAddress;

    // Capture the current request time
    const request_time = new Date().toISOString();

    const insertCustomer = await query({
      query:
        "INSERT INTO customers (ip_address, username, password, email, photo, request_time) VALUES (?, ?, ?, ?, ?, ?)",
      values: [
        ip_address,
        username,
        password,
        email,
        photo || null,
        request_time,
      ],
    });

    const result = insertCustomer.affectedRows;
    let message = result ? "success" : "error";

    const customer = {
      ip_address: ip_address,
      username: username,
      // Include other fields as needed
    };

    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        customer: customer,
      })
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        error: "Internal Server Error",
      })
    );
  }
}

export async function PUT(request) {
  try {
    const { id, username, password, email, photo } = await request.json();

    const updateCustomer = await query({
      query:
        "UPDATE customers SET username = ?, password = ?, email = ?, photo = ? WHERE id = ?",
      values: [username, password, email, photo || null, id],
    });

    const result = updateCustomer.affectedRows;
    let message = result ? "success" : "error";

    const customer = {
      id: id,
      username: username,
      // Include other fields as needed
    };

    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        customer: customer,
      })
    );
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        error: "Internal Server Error",
      })
    );
  }
}
