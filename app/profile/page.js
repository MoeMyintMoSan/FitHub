"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import ProfileCard from "@/components/ui/profileCard";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  // Default to session email, but update if user_id exists
  const [userEmail, setUserEmail] = useState(session?.user?.email);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`/api/profile?user_id=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error fetching user email:", data.error);
          } else {
            setUserEmail(data.email); // Update with fetched email
          }
        })
        .catch((error) => console.error("Error fetching user email:", error))
        .finally(() => setLoading(false)); // Stop loading after fetch
    }
  }, [userId]);

  if (status === "loading" || loading) {
    return <p>Loading...</p>; // Prevent rendering until data is ready
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <Layout pathname={"/profile"}>
      <ProfileCard user1={session?.user?.email} user2={userEmail} />
    </Layout>
  );
};

export default ProfilePage;
