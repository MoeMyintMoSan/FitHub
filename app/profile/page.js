"use client";
import React from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component

const ProfilePage = () => {
  return (
    <Layout pathname={"/profile"}> {/* Pass the correct pathname */}
      <h1>Welcome to Profile</h1>
      <p>Your profile wack as heck!</p>
    </Layout>
  );
};

export default ProfilePage;
