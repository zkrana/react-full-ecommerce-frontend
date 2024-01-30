"use client";
import { useEffect, useState } from "react";
import { Container, Alert } from "@mui/material";
import Header from "./header/Header";
import Banner from "@/components/Banner";

function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);

  // Retrieve userData from session storage
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  // console.log("userData:", userData); // Log userData to console
  // Access userId as userData?.userId
  const userId = userData?.userId;
  // console.log("userId:", userId); // Log userId to console
  const username = userData?.username;

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      // Redirect to the login page if not logged in
      window.location.href = "/";
    }

    // Show the alert after 5 seconds
    const alertTimeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(alertTimeout);
  }, []);

  return (
    <div className="">
      <div className="head">
        <Header username={username} userId={userId} />
      </div>
      <Container>
        <div className="user-main-body mt-5">
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
      </Container>
    </div>
  );
}

export default Dashboard;