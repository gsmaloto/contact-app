import React, { useState } from "react";
import useAuthStore from "../stores/authStore";

function Signup() {
  const { error, email, password, setData, signupUser } = useAuthStore(
    (state) => state
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    signupUser();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Signup</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        {error && <div className="bg-red-300 rounded px-4 py-2">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setData("email", e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setData("password", e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
