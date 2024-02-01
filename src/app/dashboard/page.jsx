"use client";
// Dashboard.js
import { useEffect, useState } from "react";
import { Container, Alert } from "@mui/material";
import Header from "../../components/Header";
import Banner from "@/components/Banner";
import EcomAll from "@/components/ecommerce/EcomAll";

function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);

  // Retrieve userData from session storage
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?.userId;
  const username = userData?.username;

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn || !userId) {
      window.location.href = "/"; // Redirect to login if not logged in
    }

    // Show the alert after 5 seconds
    const alertTimeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(alertTimeout);
  }, [userId]);

  return (
    <div className="">
      <div className="head">
        {userId && ( // Only render the Header if userId is available
          <Header username={username} userId={userId} />
        )}
      </div>
      <div className="w-[90%] mx-auto user-main-body mt-5">
        <div className="w-[90%] mx-auto">
          {showAlert && (
            <Alert severity="success">
              Welcome,{" "}
              <span className="p-1 px-2 bg-yellow-300 text-black rounded text-base ">
                {username}
              </span>{" "}
              ! You have successfully logged into your account!
            </Alert>
          )}
        </div>
        <Banner />
        <EcomAll />
      </div>
    </div>
  );
}

export default Dashboard;
