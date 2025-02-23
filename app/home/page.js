"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Post from "@/components/ui/post";
import CreatePost from "@/components/ui/createPost";


const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const email = session?.user?.email;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
  
        const data = await res.json();
        console.log("Fetched posts:", data); // Debugging
        setPosts(data); // Ensure this updates state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  
    if (status === "authenticated") {
      fetchPosts(); // Call the function here
    } else if (status === "unauthenticated") {
      router.push("/");
    }
    
    async function getUser() {
      try {
        const res = await fetch(`/api/users?email=${email}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    if (status === "authenticated") {
      fetchPosts();
      getUser();
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router, email]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <Layout pathname={"/home"} style={{ overflow: "hidden" }}>
      {posts.length > 0 ? (
        posts.map((post) => {
          console.log("Rendering post:", post.post_id);
          return <Post key={post.post_id} post_id={post.post_id} email={email} />;
        })
      ) : (
        <p>No posts available</p>
      )}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        {user && user.user_type !== "Athlete" &&  <CreatePost type={user.user_type} email={email}/>}
      </div>
    </Layout>
  );
};

export default HomePage;
