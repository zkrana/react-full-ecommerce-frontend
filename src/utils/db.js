// Create the pool once (outside the query function)
const pool = await mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  connectionLimit: 10,
});

// Use the pool in your query function
export async function query({ query, values = [] }) {
  try {
    console.log("Executing query:", query, "with values:", values);
    const [results] = await pool.execute(query, values);
    console.log("Query results:", results);
    return results;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw new Error(
      `Error executing query: ${
        error.message
      }. Query: ${query}, Values: ${JSON.stringify(values)}`
    );
  }
}
