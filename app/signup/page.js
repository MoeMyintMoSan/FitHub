"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(""); // State for Date of Birth
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!dob) {
      setError("Please enter your date of birth");
      setLoading(false);
      return;
    }

    // Simulate a signup request
    setTimeout(() => {
      setLoading(false);
      if (typeof window !== "undefined") {
        window.location.href = "/home"; // Redirect manually to /home after successful signup
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1113]">
      <div className="w-full max-w-md p-8 bg-[#1A1D21] shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Sign Up
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-[#0E1113] text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-[#FD6262] focus:border-[#FD6262]"
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-white"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <a href="/" className="text-[#FD6262] hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
