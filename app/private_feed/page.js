"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/ui/layout"; // Import the Layout component
import { useSession } from "next-auth/react"; // Import session
import { useRouter } from "next/navigation";
import CreatePost from "@/components/ui/createPost";
import UserBox from "@/components/ui/UserBox"; // Import the UserBox component

const PrivateFeed = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [accounts, setAccounts] = useState([]);
  const uniqueAccounts = Array.from(new Map(accounts.map(item => [item.user_id, item])).values());
  const [usertype, setUserType] = useState(null);
  const email = session?.user?.email;
  // Authentication check and redirection
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to sign-in if not authenticated
    }
  }, [status, router]);

  // Fetch accounts based on the current user's type
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      // Fetch the current user's ID
      fetch(`/api/users?email=${encodeURIComponent(email)}`)
        .then((response) => response.json())
        .then((data) => {
          const userId = data.user_id;
          setUserType(data.user_type);
          // Fetch the relevant accounts based on the user's type
          fetch(`/api/privatefeed/${userId}`)
            .then((response) => response.json())
            .then((data) => setAccounts(data))
            .catch((error) => console.error("Error fetching accounts:", error));
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [session, status]);

  // Handle account click to navigate to the respective user's profile
  const handleAccountClick = (userId) => {
    router.push(`/private_feed/${userId}`);
  };
  
  // Show a loading state while checking auth status or fetching data
  if (status === "loading" || !session) {
    return <p>Loading...</p>;
  }

  // Prevent rendering until redirected
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <Layout pathname={"/private_feed"}>
      <h1 className="my-2 "></h1>
      {uniqueAccounts.map((account) => (
        <UserBox
          key={account.user_id}
          account={account}
          onClick={() => handleAccountClick(account.user_id)}
        />
      ))}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        {/* {usertype === "Athlete" ? <br/> : <CreatePost type={usertype} email={email} /> } */}
        {usertype && usertype !== "Athlete" && <CreatePost type={usertype} email={email} />}
      </div>
    </Layout>
  );
};

export default PrivateFeed;


// "use client";
// import React, { useEffect } from "react";
// import Layout from "@/components/ui/layout"; // Import the Layout component
// import { useSession, signIn } from "next-auth/react"; // Import session and signIn
// import { useRouter } from "next/navigation";
// import CreatePost from "@/components/ui/createPost";
// import PrivateFeed from "@/components/ui/privateFeed";

// const PrivatePage = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/"); // Redirect to sign-in if not authenticated
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <p>Loading...</p>; // Show a loading state while checking auth status
//   }

//   if (status === "unauthenticated") {
//     return null; // Prevent rendering until redirected
//   }

//   return (
//     <Layout pathname={"/private_feed"}>
//       <PrivateFeed />
//       <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
//               <CreatePost type="trainer" />
//               {/* The Post component will be rendered inside the layout */}
//             </div>
//     </Layout>
//   );
// };

// export default PrivatePage;
