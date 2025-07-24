import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      navigate("/home");
    } else if (res.status === 409) {
      setMessage("Employee already exists");
    } else {
      setMessage("Signup failed");
    }
  };

  return (
    <div className="flex flex-col border gap-4 p-6 mt-[30px] text-center max-w-[450px] m-auto">
      <h2 className="text-black font-medium text-lg">
        Let's create your ID...
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          className="border px-3 py-2 rounded text-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-600 hover:text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
        {message && <p className="text-red-600 text-sm">{message}</p>}
      </form>
    </div>
  );
}

export default SignUp;
