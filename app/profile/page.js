"use client";
import React from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component

import ProfileCard from "@/components/ui/profile_card"; // Import the Post component

const ProfilePage = () => {
  return (
    <Layout pathname={"/profile"}> {/* Pass the correct pathname */}
      <ProfileCard /> {/* The Post component will be rendered inside the layout */}
    </Layout>
  );
};

export default ProfilePage;
