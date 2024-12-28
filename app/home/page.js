"use client";
import React, { useEffect } from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component
import { useSession, signIn } from "next-auth/react"; // Import session and signIn
import { useRouter } from "next/navigation";

import PostTrainer from "@/components/ui/post_trainer";
import PostNutrition from "@/components/ui/post_nutrition";
import CreateTrainerPost from "@/components/ui/create_post_trainer"; // Import the Post component

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/page"); // Redirect to sign-in if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading state while checking auth status
  }

  if (status === "unauthenticated") {
    return null; // Prevent rendering until redirected
  }

  return (
    <Layout pathname={"/home"}>
      <h1>Welcome to FitHub</h1>
      <p>Your one-stop solution for fitness tracking and management.</p>
      <PostTrainer />
      <br />
      <PostNutrition />
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <CreateTrainerPost />
      </div>
    </Layout>
  );
};

export default HomePage;
