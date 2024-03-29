"use client";
import axios from "axios";
import React, { useState } from "react";
import "@fontsource/roboto/400.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState(""); // Add state for rePassword
  const [apiResponse, setApiResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      newPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    return newPassword;
  };

  const handleGeneratePassword = () => {
    setPassword(generatePassword());
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/auth/users", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setApiResponse(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response);
        setApiResponse(error.response.data.error || "Internal Server Error");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Typography
            style={{ marginBottom: "20px" }}
            variant="h2"
            component="h2"
          >
            Sign up
          </Typography>
          {apiResponse && (
            <Alert
              style={{ marginBottom: "20px" }}
              severity={apiResponse.includes("success") ? "success" : "error"}
            >
              {apiResponse}
            </Alert>
          )}
          <TextField
            type="text"
            value={username}
            onChange={handleUsernameChange}
            variant="filled"
            id="filled-basic-username"
            label="Username"
            fullWidth
            style={{ marginBottom: "20px" }}
          />

          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="filled"
            id="filled-basic-email"
            label="Email address"
            fullWidth
            style={{ marginBottom: "20px" }}
          />

          <div>
            <TextField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              variant="filled"
              id="filled-basic-password"
              label="Password"
              fullWidth
              style={{ marginBottom: "10px" }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              type="password" // Use type="password" for rePassword
              value={rePassword}
              onChange={handleRePasswordChange}
              variant="filled"
              id="filled-basic-repassword"
              label="Re-enter Password"
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <Button
              size="small"
              style={{ marginBottom: "25px" }}
              onClick={handleGeneratePassword}
            >
              Generate password
            </Button>
          </div>
          <Button
            variant="contained"
            type="submit"
            className=" text-black text-base transition-colors hover:text-white"
          >
            Sign up
          </Button>
          <Typography
            variant="body1"
            gutterBottom
            style={{ marginTop: "20px" }}
          >
            Do You have an account? <Link href="/login">Sign in</Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
}

export default Register;
