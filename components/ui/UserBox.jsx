import React from "react";
import { Box, Typography, Chip, Grid } from "@mui/material";

const UserBox = ({ account, onClick }) => {
  const { user_name, user_type, pro_type, like_count } = account;

  return (
    <Box
      onClick={onClick} // Attach the onClick handler
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1E1E1E",
        p: 2,
        mb: 2,
        borderRadius: "8px",
        cursor: "pointer", // Add pointer cursor to indicate clickability
        "&:hover": {
          backgroundColor: "#2E2E2E", // Add hover effect
        },
      }}
    >
      {/* Use a Grid container to align items */}
      <Grid container alignItems="center" spacing={2}>
        {/* Username on the left */}
        <Grid item xs={4}>
          <Typography sx={{ color: "white", fontWeight: "bold" }}>
            {user_name}
          </Typography>
        </Grid>

        {/* Account type in the middle (fixed space) */}
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Chip
            label={user_type}
            sx={{
              color: pro_type === "trainer" ? "#00BFA5" : "#9C27B0",
              fontWeight: "bold",
            }}
          />
        </Grid>

        {/* Like count on the right */}
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ color: "#ED6262", fontWeight: "bold" }}>
            ❤️ {like_count}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserBox;