// Your component file (e.g., src/components/CheckComponent.js)
import { query } from "@/utils/db"; // Adjust the path as needed

const Check = async () => {
  try {
    const result = await query({
      query: "SELECT * FROM customers",
    });
    return <div>{JSON.stringify(result)}</div>;
  } catch (error) {
    console.error("Error in Check component:", error);
    return <div>Error: {error.message}</div>;
  }
};

export default Check;
