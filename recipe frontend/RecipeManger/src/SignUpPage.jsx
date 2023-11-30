import LoginPage from "./LoginPage";
import "./app.css";
import { useRef, useState } from "react";

function SignUpPage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [back, setBack] = useState(false);
  const [err, setError] = useState(false);
  function goBack() {
    setBack(true);
  }

  function signUp() {
    let username = String(usernameRef.current.value);
    let password = String(passwordRef.current.value);
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials); // Base64 encode the credentials
    if (username.length < 6 || password.length < 6) {
      console.log("password or username invalid");
      setError(true);
    } else {
      setError(false);
      const backendUrl = "http://localhost:8080/api/v1";
      let sign = async () => {
        try {
          const response = await fetch(`${backendUrl}/SignUp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${encodedCredentials}`,
            },
          });

          if (!response.ok) {
            setError(true);
            console.log("here");
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const contentType = response.headers.get("Content-Type");

          if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            console.log(result);
            // You may want to update the state or perform other actions based on the result
          } else {
            // Handle non-JSON response
            const result = await response.text();
            console.log(result);
            // You may want to handle non-JSON response differently
          }
          // You may want to update the state or perform other actions based on the result
          setBack(true);
        } catch (error) {
          console.error("Error:", error);

          // Handle errors as needed
        }
      };
      sign();
    }
  }
  if (!back) {
    return (
      <div className="body">
        <div className="loginBox">
          <h1 className="title">Thank you for joining</h1>
          <div className="userInputFields">
            <div className="userInputFields">
              <label htmlFor="username">Username</label>
              <input ref={usernameRef} type="text" id="username" />
            </div>
            <p>
              <br />
            </p>
            <div className="userInputFields">
              <label htmlFor="password">Password</label>
              <input ref={passwordRef} type="password" id="password" />
            </div>
          </div>
          <p>Username and password need to be at least 6 characters long</p>
          {err ? <p>Username or Password invalid</p> : null}
          <div className="buttonContainer">
            <button onClick={goBack}>Return to homepage</button>
            <button onClick={signUp}>Sign Up</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoginPage />;
  }
}

export default SignUpPage;
