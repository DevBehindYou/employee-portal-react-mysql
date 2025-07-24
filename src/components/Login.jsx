import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();

   try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        navigate("/home"); 
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error");
    }
  };

  return (
    <div className="flex flex-col border gap-4 p-6 mt-[30px] text-center max-w-[450px] m-auto">
      <h2 className="text-black font-medium text-lg">
        Let's log in with your credentials...
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="border px-3 py-2 rounded text-sm"
          value={username.toLowerCase().trim()}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded text-sm"
          value={password.trim()}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-600 hover:text-white px-4 py-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
