"use client";
import React from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component
import { useRouter } from "next/navigation";

import Post from "@/components/ui/post";
import CreatePost from "@/components/ui/create_post"; // Import the Post component

const HomePage = () => {
  const router = useRouter();
  return (
    <Layout pathname={"/home"}>
      {" "}
      {/* Wrap the homepage content inside the Layout */}
      <h1>Welcome to FitHub</h1>
      <p>Your one-stop solution for fitness tracking and management.</p>
      <Post
        type="trainer"
        avatarLabel="K"
        title="KyawGyi_Fitness"
        subheader="December 28, 2024"
        image="https://images.everydayhealth.com/images/healthy-living/fitness/everything-you-need-know-about-fitness-1440x810.jpg"
        imageAlt="Fitness"
        mainContent="Beginner guide to weight loss and fitness"
        listItems={["Sit Ups", "Push Ups", "Lunges"]}
        secondaryListItems={["60", "30", "30"]}
        tertiaryListItems={["2", "3", "3"]}
        expandedDescriptions={[
          "DO NOT forget to rest between each set and stay hydrated.",
          "These exercises are beginner-friendly and can be done at home. Stay healthy and fit!",
        ]}
      />
      <br />
      <Post
        type="nutritionist"
        avatarLabel="H"
        title="HealthyEating_101"
        subheader="December 28, 2024"
        image="https://cdn-abioh.nitrocdn.com/iRwsMXPEdaMSNBlSqLBkXmjSJwoqRrps/assets/images/optimized/rev-01bf621/www.apinchofhealthy.com/wp-content/uploads/2022/10/Styled-baked-chicken-breast-8-2.jpg"
        imageAlt="Healthy Food"
        mainContent="Beginner guide to balanced nutrition"
        listItems={["Fruits", "Vegetables", "Whole Grains"]}
        secondaryListItems={["3 servings", "2 servings", "1-2 servings"]}
        tertiaryListItems={["Daily", "Daily", "Daily"]}
        expandedDescriptions={[
          "Include a variety of fruits and vegetables to get all the essential nutrients.",
          "Whole grains are a great source of fiber and should be included in your daily meals.",
        ]}
      />
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <CreatePost type="trainer" />{" "}
        {/* The Post component will be rendered inside the layout */}
      </div>
    </Layout>
  );
};

export default HomePage;
