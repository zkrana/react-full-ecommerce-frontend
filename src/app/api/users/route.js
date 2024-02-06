import { query } from "@/utils/db";

// GET request handler
// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const customerId = searchParams.get("customerId");

//     let customerData;

//     if (customerId) {
//       customerData = await query({
//         query: "SELECT * FROM customers WHERE id = ?",
//         values: [customerId],
//       });
//     } else {
//       customerData = await query({
//         query: "SELECT * FROM customers",
//       });
//     }

//     return new Response(JSON.stringify(customerData), { status: 200 });
//   } catch (error) {
//     console.error("Error in GET request:", error);
//     return new Response(JSON.stringify("Internal Server Error"), {
//       status: 500,
//     });
//   }
// }

// // DELETE request handler
// export async function DELETE(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const customerId = searchParams.get("customerId");

//     if (customerId) {
//       const result = await query({
//         query: "DELETE FROM customers WHERE id = ?",
//         values: [customerId],
//       });

//       return new Response(JSON.stringify(result), { status: 200 });
//     } else {
//       return new Response(JSON.stringify("Customer ID not found"), {
//         status: 200,
//       });
//     }
//   } catch (error) {
//     console.error("Error in DELETE request:", error);
//     return new Response(JSON.stringify("Internal Server Error"), {
//       status: 500,
//     });
//   }
// }

// // Default handler
// export default async function handler(req, res) {
//   const allowedMethods = ["GET", "POST", "PUT", "DELETE"];

//   if (!allowedMethods.includes(req.method)) {
//     return res.status(405).end();
//   }

//   try {
//     return await module.exports[req.method](req);
//   } catch (error) {
//     console.error("Error in handler:", error);
//     return handleError(error, req);
//   }
// }

// // Error handling function
// async function handleError(error, request) {
//   console.error(error);

//   console.error("Request Method:", request.method);
//   console.error("Request URL:", request.url);
//   console.error("Request Headers:", request.headers);

//   return new Response("Internal Server Error", {
//     status: 500,
//   });
// }

export default async function handler(req, res) {
  let message;

  if (req.method === "GET") {
    try {
      const customers = await query({
        query: "SELECT * FROM customers",
        values: [userId],
      });
      res.status(200).json({ customers: customers });
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { username, email, password, photo } = req.body;
      const userIpAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      const addCustomer = await query({
        query:
          "INSERT INTO customers (ip_address, username, email, password, photo) VALUES (?, ?, ?, ?, ?)",
        values: [userIpAddress, username, email, password, photo],
      });

      let user = {};
      if (addCustomer.insertId) {
        message = "success";
        user = {
          id: addCustomer.insertId,
          username: username,
          email: email,
          photo: photo,
        };
      } else {
        message = "error";
      }

      res.status(200).json({ response: { message: message, user: user } });
    } catch (error) {
      console.error("Error adding customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, username, email, photo } = req.body;
      const updateValues = [username, email];

      // Only add photo to the update values if it is provided
      if (photo !== undefined) {
        updateValues.push(photo);
      }

      updateValues.push(id);

      const updateCustomer = await query({
        query:
          "UPDATE customers SET username = ?, email = ?" +
          (photo !== undefined ? ", photo = ?" : "") +
          " WHERE id = ?",
        values: updateValues,
      });

      const result = updateCustomer.affectedRows;
      let user = {};
      if (result) {
        message = "success";
        user = {
          id: id,
          username: username,
          email: email,
          photo: photo,
        };
      } else {
        message = "error";
      }

      res.status(200).json({ response: { message: message, user: user } });
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
