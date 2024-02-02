import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "reactcrud-non-jwt",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Attempt to get a connection from the pool to check if the initial connection is successful
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connection successful!");
    connection.release(); // Release the connection back to the pool
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
