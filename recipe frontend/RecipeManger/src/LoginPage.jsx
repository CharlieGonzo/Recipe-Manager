import "./App.css";
import { useRef, useState } from "react";
import MainPage from "./MainPage";
function LoginPage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function login() {
    const backendUrl = "http://localhost:8080/api/v1/";

    // Replace 'your_username' and 'your_password' with the actual username and password you want to send
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // Construct the URL with query parameters
    const url = `${backendUrl}login?username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    // Fetch API GET request
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // You can add additional headers if needed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data returned from the server

        setLoggedInUser(data);
        console.log("User data:", data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }

  if (!isLoggedIn) {
    return (
      <div className="body">
        <div className="loginBox">
          <h1 className="title">Recipe Manager</h1>
          <div className="userInputFields">
            <div className="userInputFields">
              <input ref={passwordRef} type="password" id="password" />
              <label htmlFor="password">Password</label>
            </div>
            <p>
              <br />
            </p>
            <div className="userInputFields">
              <input ref={usernameRef} type="text" id="username" />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  } else {
    return <MainPage user={loggedInUser} />;
  }
}

export default LoginPage;
