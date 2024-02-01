"use client";
import { Container, Typography, Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import MainNav from "@/components/MainNav";
import TopBar from "@/components/TopBar";
import Search from "@/components/Search";
import Link from "next/link";

function Header({ username, userId }) {
  const [user, setUser] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const userDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target)
    ) {
      setUser(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userData");
    window.location.href = "/logout";
  };

  const handleFileChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];

      if (!selectedFile) {
        console.error("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const url = `http://localhost/reactcrud/backend/auth/api/photo-upload.php?userId=${userId}`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Photo upload successful:", response.data);

      setUserPhoto(response.data.filePath);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const fetchUserPhoto = async () => {
    try {
      const response = await axios.get(
        `http://localhost/reactcrud/backend/auth/api/get-user-photo.php?userId=${userId}`
      );

      setUserPhoto(response.data.filePath);
      setUser(false); // Initially hide the dropdown
    } catch (error) {
      console.error("Error fetching user photo:", error);
    }
  };

  const toggleUserDropdown = () => {
    setUser((prevUser) => !prevUser);
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData && userData.userId) {
      fetchUserPhoto();
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userId]);

  return (
    <div className="block">
      <TopBar />
      <div className="w-full pb-3 border-b border-gray-200 pt-2">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          <div className="logo w-[15%] text-2xl font-bold text-gray-800">
            <Link href="/">Logo</Link>
          </div>

          <div className="nav w-[60%]">
            <Search />
          </div>

          <div className="header-actions flex justify-end gap-2 items-center w-[25%]">
            {!userId && (
              <Link href="/login">
                <span className="bg-slate-800 rounded-full py-2 px-4 border-none text-sm text-white hover:bg-slate-900 transition duration-300 cursor-pointer">
                  Signin / Signup
                </span>
              </Link>
            )}
            {userId && (
              <div
                className="user-p flex items-center justify-end relative"
                ref={userDropdownRef}
              >
                <div
                  className="d-u w-11 h-11 rounded-full bg-white border border-gray-200 p-1 flex justify-center items-center text-white cursor-pointer"
                  onClick={toggleUserDropdown}
                >
                  <img
                    src={`http://localhost/reactcrud/backend/auth/${userPhoto}`}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                {user && (
                  <div className="main-u absolute right-0 top-12 w-72 rounded-md px-4 pt-5 pb-4 shadow-md border border-gray-300 bg-white z-50">
                    <div className="u-header pb-3 border-b border-slate-200">
                      {userPhoto ? (
                        <div className="u-status flex items-center gap-2">
                          <div className="u w-11 h-11 bg-slate-400 rounded-full m-1 flex justify-center items-center border-2 border-gray-500">
                            <img
                              src={`http://localhost/reactcrud/backend/auth/${userPhoto}`}
                              alt="User"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </div>

                          <div className="uer">
                            <span className="block text-base text-black">
                              {username.charAt(0).toUpperCase() +
                                username.slice(1)}
                            </span>
                            <span className="block text-base text-black">
                              Employee
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="u-status flex items-center gap-2">
                          <div className="u-h-d flex gap-3 items-center pb-3 border-b border-slate-200 cursor-pointer">
                            <label
                              htmlFor="photoInput"
                              className="upload-label"
                            >
                              Upload Photo
                            </label>
                            <input
                              type="file"
                              id="photoInput"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </div>
                          <div className="uer">
                            <span className="block text-base text-black">
                              {username.charAt(0).toUpperCase() +
                                username.slice(1)}
                            </span>
                            <span className="block text-base text-black">
                              Employee
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <ul className="flex flex-col gap-3 mt-3">
                      <li>Profile</li>
                      <li>Security</li>
                      <li>Book</li>
                      <li className=" pt-3 border-t border-slate-200">
                        <Button variant="contained" onClick={handleLogout}>
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mainNav lg:max-w-7xl w-[95%] mx-auto flex justify-center items-center pt-2">
        <MainNav />
      </div>
    </div>
  );
}

export default Header;
