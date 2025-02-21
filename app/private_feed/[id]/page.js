"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component
import { useSession } from "next-auth/react"; // Import session
import { useRouter } from "next/navigation";
import Post from "@/components/ui/post"; // Import the Post component

const PrivateFeedPosts = ({ params }) => {
  const { id } = React.use(params); // Unwrap params using React.use()
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Authentication check and redirection
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to sign-in if not authenticated
    }
  }, [status, router]);

  // Fetch posts associated with the current user and the clicked account
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      // Fetch the current user's ID
      fetch(`/api/users?email=${encodeURIComponent(session.user.email)}`)
        .then((response) => response.json())
        .then((data) => {
          const currentUserId = data.user_id;

          // Fetch posts associated with the current user and the clicked account
          fetch(`/api/privatefeed/posts?currentUserId=${currentUserId}&otherUserId=${id}`)
            .then((response) => response.json())
            .then((data) => {
              setPosts(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching posts:", error);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
          setLoading(false);
        });
    }
  }, [session, status, id]);

  // Show a loading state while checking auth status or fetching data
  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  // Prevent rendering until redirected
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <Layout pathname={`/private_feed/${id}`}>
      <h1 className="my-2">Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.post_id} style={{ marginBottom: "20px" }}>
            <Post post_id={post.post_id} email={session?.user?.email} />
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </Layout>
  );
};

export default PrivateFeedPosts;