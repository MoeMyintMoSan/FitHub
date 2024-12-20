"use client";
import React from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component

const PrivatePage = () => {
  return (
    <Layout pathname={"/private_feed"}> {/* Pass the correct pathname */}
      <h1>Welcome to FitHub</h1>
      <p className="text-3xl">PRIVATE FEED hello</p>
    </Layout>
  );
};

export default PrivatePage;
