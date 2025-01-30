"use client";
import React, { useEffect } from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component
import { useSession, signIn } from "next-auth/react"; // Import session and signIn
import { useRouter } from "next/navigation";

import PrivateFeed from "@/components/ui/privateFeed";

const PrivatePage = () => {
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
    <Layout pathname={"/private_feed"}>
      <PrivateFeed />
    </Layout>
  );
};

export default PrivatePage;
