"use client";
import React, { useState } from "react";
import Layout from "@/components/ui/layout";
import { Tabs, Tab, Box, TextField, Typography, Chip, Grid } from "@mui/material";
import proData from "@/app/api/jsons/pro.json";
import postData from "@/app/api/jsons/post.json";
import Post from "@/components/ui/post"; // Import the Post component

const SearchPage = () => {
  const [tab, setTab] = useState(0); // 0 for "Account", 1 for "Post"
  const [searchTerm, setSearchTerm] = useState("");
  const accounts = proData; // Use imported proData directly
  const posts = postData; // Use imported postData directly

  // Filter accounts based on search term
  const filteredAccounts = searchTerm
    ? accounts.filter((account) =>
        account.user_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Filter posts based on search term
  const filteredPosts = searchTerm
    ? posts.filter((post) =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Layout pathname={"/search"}>
      <Box sx={{ width: "100%" }}>
      <Tabs
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        TabIndicatorProps={{ style: { backgroundColor: "#ED6262" } }}
        sx={{
          "& .MuiTab-root": { color: "#ffffff" }, // Default color
          "& .MuiTab-root.Mui-selected": { color: "#FF9999" }, // Selected tab color
        }}
      >
        <Tab label="Account" />
        <Tab label="Post" />
      </Tabs>

      </Box>

      <Box sx={{ mt: 2 }}>
        {/* Search Bar */}
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

        {/* Results */}
        <Box sx={{ mt: 3 }}>
          {tab === 0 ? (
            filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
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
                    label={account.pro_type}
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
          ) : (
            filteredPosts.length > 0 ? (
              <Grid container spacing={3}>
                {filteredPosts.map((post) => (
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
            )
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default SearchPage;
