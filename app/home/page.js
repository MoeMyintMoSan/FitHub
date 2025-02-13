"use client";
import React, { useEffect } from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component
import { useSession, signIn } from "next-auth/react"; // Import session and signIn
import { useRouter } from "next/navigation";
import Post from "@/components/ui/post";
import CreatePost from "@/components/ui/createPost"; // Import the Post component
//Reon was here
const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to sign-in if not authenticated
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
      {/* Wrap the homepage content inside the Layout */}
      <Post post_id={7}/>
      <br />
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <CreatePost type="nutritionist" />
        {/* The Post component will be rendered inside the layout */}
      </div>
    </Layout>
  );
};

export default HomePage;
