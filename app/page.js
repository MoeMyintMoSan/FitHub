"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      // Ensure this runs only on the client side
      if (typeof window !== "undefined") {
        window.location.href = "/home"; // Redirect manually on success
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1113]">
      <div className="w-full max-w-md p-8 bg-[#1A1D21] shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Sign In
        </h1>
        {error && (
          <div className="mb-4 text-red-500 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-[#0E1113] text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-[#FD6262] focus:border-[#FD6262]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-[#0E1113] text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-[#FD6262] focus:border-[#FD6262]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#FD6262] hover:bg-[#FF7A7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD6262] ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400 text-center">
          Don't have an account?{" "}
          <a href="#" className="text-[#FD6262] hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}