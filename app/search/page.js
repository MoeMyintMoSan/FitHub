"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/ui/layout";
import { Tabs, Tab, Box, TextField, Typography, Chip, Grid } from "@mui/material";
import Post from "@/components/ui/post";

const SearchPage = () => {
  const [tab, setTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

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
                <Box
                  key={account.pro_id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#1E1E1E",
                    p: 2,
                    mb: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Typography sx={{ color: "white", fontWeight: "bold" }}>
                    {account.user_name}
                  </Typography>

                  <Chip
                    label={account.user_type}
                    sx={{
                      color: account.pro_type === "trainer" ? "#00BFA5" : "#9C27B0",
                      fontWeight: "bold",
                      flex: 1,
                      textAlign: "right",
                      marginRight: "16px",
                    }}
                  />

                  <Typography sx={{ color: "#ED6262", fontWeight: "bold" }}>
                    ❤️ {account.like_count}
                  </Typography>
                </Box>
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
                    type={post.content_type}
                    title={post.title}
                    subheader={post.created_date}
                    image={post.image}
                    mainContent={post.content}
                    likeCount={post.like_count}
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
