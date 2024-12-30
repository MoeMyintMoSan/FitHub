"use client";
import React from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component

const SearchPage = () => {
  return (
    <Layout pathname={"/search"}> {/* Pass the correct pathname */}
      <h1>Welcome to Searches UwU</h1>
      <p>Go use Google! its free! Hope that helped!</p>
    </Layout>
  );
};

export default SearchPage;
