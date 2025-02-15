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
import SendIcon from "@mui/icons-material/Send";

export default function Comment({ postId, email, onClose }) {
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Fetch comments for the post
  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?post_id=${postId}`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  // Handle submitting a new comment
  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          post_id: postId,
          content: newComment,
        }),
      });

      if (!res.ok) throw new Error("Failed to post comment");
      const data = await res.json();

      // Update state with new comment
      setComments((prev) => [
        ...prev,
        { ...data.comment, username: "You"}, // Temporary until next fetch
      ]);
      setNewComment(""); // Clear input
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

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
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Box key={comment.comment_id} m={1} sx={{ bgcolor: "#283138", p: 1, borderRadius: 2 }}>
              <Typography variant="body2" color="white">
                <strong>{comment.user_name}:</strong> {comment.content}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography color="gray" align="center">
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </DialogContent>

      {/* Input Field */}
      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{
            bgcolor: "#1E252B",
            color: "white",
            borderRadius: 10,
            width: "100%",
          }}
        />
        <IconButton onClick={handleSubmit} disabled={loading}>
          <SendIcon sx={{ color: loading ? "gray" : "#ED6262" }} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
