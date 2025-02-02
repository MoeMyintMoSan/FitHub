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
          <Box m={1} sx={{bgcolor: "#283138",p: 1, borderRadius: 2,}}>
            <Typography variant="body2" color="white">
              <strong>User1:</strong> This is a great post!
            </Typography>
          </Box>
          <Box m={1} sx={{bgcolor: "#283138",p: 1, borderRadius: 2,}}>
          <Typography variant="body2" color="white">
              <strong>kali_123: </strong> Your dedication is seriously inspiring! 🔥 Fitness isn’t just about looking good—it’s about feeling strong, confident, and unstoppable. Keep pushing your limits!
            </Typography>
          </Box>
          <Box m={1} sx={{bgcolor: "#283138",p: 1, borderRadius: 2,}}>
          <Typography variant="body2" color="white">
              <strong>potter_lol: </strong> This is the kind of motivation I needed today! Consistency and discipline make all the difference. Keep crushing those goals! 💪👏
            </Typography>
          </Box>
          <Box m={1} sx={{bgcolor: "#283138",p: 1, borderRadius: 2,}}>
          <Typography variant="body2" color="white">
              <strong>moesan_lol: </strong> Incredible progress! Fitness is a journey, and you’re proving that hard work and persistence pay off. Keep going strong! 🚀
            </Typography>
          </Box>
          <Box m={1} sx={{bgcolor: "#283138",p: 1, borderRadius: 2,}}>
          <Typography variant="body2" color="white">
              <strong>noenoe_lol: </strong> The energy and effort you put in are next-level! Fitness isn’t just about the results, but the process—and you’re making it look effortless! 🔥💯
            </Typography>
          </Box>
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
