"use client";
import React, { useEffect } from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component
import { useSession, signIn } from "next-auth/react"; // Import session and signIn
import { useRouter } from "next/navigation";
import CreatePost from "@/components/ui/createPost";
import PrivateFeed from "@/components/ui/privateFeed";

const PrivatePage = () => {
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
    <Layout pathname={"/private_feed"}>
      <PrivateFeed />
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
              <CreatePost type="trainer" />
              {/* The Post component will be rendered inside the layout */}
            </div>
    </Layout>
  );
};

export default PrivatePage;
