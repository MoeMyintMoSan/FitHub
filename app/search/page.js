"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/ui/layout";
import { Tabs, Tab, Box, TextField, Typography, Grid } from "@mui/material";
import Post from "@/components/ui/post";
import UserBox from "@/components/ui/UserBox"; // Import the UserBox component
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SearchPage = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const type = tab === 0 ? "account" : "post"; // Define type correctly
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm, type }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    };

    fetchResults();
  }, [searchTerm, tab]);

  // Define the handleClick function for UserBox
  const handleUserClick = (account) => {
    console.log("User clicked:", account);
    if (account && account.user_id) {
      console.log("Navigating to user profile...");
      router.push(`/profile?user_id=${account.user_id}`);
    }
    // Add your logic here, e.g., navigate to the user's profile
  };

  return (
    <Layout pathname={"/search"}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tab}
          onChange={(event, newValue) => setTab(newValue)}
          TabIndicatorProps={{ style: { backgroundColor: "#ED6262" } }}
          sx={{
            "& .MuiTab-root": { color: "#ffffff" },
            "& .MuiTab-root.Mui-selected": { color: "#FF9999" },
          }}
        >
          <Tab label="Account" />
          <Tab label="Post" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Search for an ${tab === 0 ? "account" : "post"}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "#1E1E1E",
            borderRadius: "5px",
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#51626D" },
              "&:hover fieldset": { borderColor: "#ED6262" },
              "&.Mui-focused fieldset": { borderColor: "#ED6262" },
            },
          }}
        />

        <Box sx={{ mt: 3 }}>
          {tab === 0 ? (
            results.length > 0 ? (
              results.map((account) => (
                <UserBox
                  key={account.user_id}
                  account={account}
                  onClick={() => handleUserClick(account)} // Pass the handleClick function
                />
              ))
            ) : (
              <Typography sx={{ color: "white" }}>
                {searchTerm ? "No accounts found." : "Enter a search term to find accounts."}
              </Typography>
            )
          ) : results.length > 0 ? (
            <Grid container spacing={3}>
              {results.map((post) => (
                <Grid item xs={12} key={post.post_id}>
                  <Post
                    post_id={post.post_id}
                    email={session.user.email}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ color: "white" }}>
              {searchTerm ? "No posts found." : "Enter a search term to find posts."}
            </Typography>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default SearchPage;