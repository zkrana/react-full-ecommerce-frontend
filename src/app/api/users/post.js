// POST request handler// POST request handler
export async function POST(request) {
  try {
    const requestData = await request.json();
    const { username, password, email, photo, request_time } = requestData;

    const existingCustomer = await query({
      query: "SELECT * FROM customers WHERE username = ?",
      values: [username],
    });

    if (existingCustomer.length > 0) {
      throw new Error("Username already exists");
    }

    const insertResult = await query({
      query:
        "INSERT INTO customers (username, password, email, photo, request_time) VALUES (?, ?, ?, ?, ?)",
      values: [username, password, email, photo, request_time],
    });

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Customer registered successfully",
        customerId: insertResult.insertId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return handleError(error, request); // Make sure this line is correct
  }
}
