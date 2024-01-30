"use client";
import { useEffect } from "react";
import axios from "axios";

function Logout() {
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      // Redirect to the login page if not logged in
      window.location.href = "/";
    }
    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(alertTimeout);
  }, []);

  axios
    .post("http://localhost/reactcrud/backend/auth/api/logout.php")
    .then((response) => {
      sessionStorage.clear();
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
      // Handle errors appropriately
    });
}
export default Logout;
