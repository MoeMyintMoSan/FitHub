"use client";

import * as React from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import Input from "@mui/joy/Input";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from '@mui/icons-material/Send';

export default function Comment({ onClose }) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="comment-dialog-title"
      PaperProps={{
        sx: {
          bgcolor: "#0E1113",
          height: "500px",
          display: "flex",
          width: "400px",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2}>
        <DialogTitle id="comment-dialog-title" color="white">
          Comments
        </DialogTitle>
        <DialogActions>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Box>

      {/* Comment Section */}
      <DialogContent sx={{ flex: 1, overflowY: "auto" }}>
        {["User1", "User2", "User3", "User4", "User5","User6","User7","User8","User9"].map((user, index) => (
          <Box
            key={index}
            m={1}
            sx={{
              bgcolor: "#283138",
              p: 1,
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" color="white">
              <strong>{user}:</strong> This is a great post!
            </Typography>
          </Box>
        ))}
      </DialogContent>

      {/* Input Field Sticking to Bottom */}
      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Input
          placeholder="Add a comment..."
          sx={{
            bgcolor: "#1E252B",
            color: "white",
            borderRadius: 10,
            float: "left",
            width: "100%",
          }}
        />
        <IconButton><SendIcon sx={{color: "#ED6262"}}/></IconButton>
      </DialogActions>
    </Dialog>
  );
}
