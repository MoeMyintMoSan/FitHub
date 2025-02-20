"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blueGrey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Box, Grid, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; // Updated import

const Comment = dynamic(() => import("./comment"), { ssr: false });

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
}));

export default function Post({ post_id }) {
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  const [listGroups, setListGroups] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${post_id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);

        let groups = [];

        if (data.content_type === "Trainer") {
          groups.push({
            title: "Exercises",
            items: data.details.map((d) => `${d.exercise} (Sets: ${d.sets}, Reps: ${d.reps})`),
          });
        } else if (data.content_type === "Nutritionist") {
          groups.push({
            title: "Food Items",
            items: data.details.map((d) => `${d.food} - ${d.calories} kcal`),
          });
        }

        setListGroups(groups);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [post_id]);

  const handleExpandClick = () => setExpanded(!expanded);
  const toggleComment = () => setShowComment((prev) => !prev);

  const handleCardHeaderClick = () => {
    if (post && post.professional_id) {
      router.push(`/profile?user_id=${post.professional_id}`);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          Post not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card
        sx={{
          maxWidth: 800,
          borderRadius: 2,
          bgcolor:
            post.content_type === "Trainer"
              ? "#2B2231"
              : post.content_type === "Nutritionist"
              ? "#222F31"
              : "#2B2231",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blueGrey[500] }}>
              {post.user_name.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{ color: "white" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.user_name}
          subheader={post.created_date}
          sx={{ color: blueGrey[50], cursor: "pointer" }} // Add cursor pointer
          subheaderTypographyProps={{ sx: { color: blueGrey[200] } }}
          onClick={handleCardHeaderClick} // Add onClick handler
        />

        <Grid container>
          <Grid item xs={5} sx={{ ml: 2 }}>
            <CardMedia
              component="img"
              image={post.image || "https://via.placeholder.com/550x250"}
              alt={post.title}
              sx={{ height: "250px", width: "550px", borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={6} sx={{ ml: 2 }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: "white", fontSize: 18 }}>
                {post.title}
              </Typography>
            </CardContent>
            <Grid container sx={{ ml: 2 }} spacing={2}>
              {listGroups.map((group, groupIndex) => (
                <Grid item xs={12} key={groupIndex}>
                  <Typography
                    variant="body2"
                    sx={{ color: "white", fontSize: 14 }}
                  >
                    {group.title}
                  </Typography>
                  {group.items.map((item, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        color: "white",
                        fontSize: 14,
                        bgcolor: "#283138",
                        mt: 1,
                        pt: 0.5,
                        pl: 1,
                        mr: 2,
                        pb: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" sx={{ color: "white" }}>
            <FavoriteIcon />
          </IconButton>
          <IconButton
            onClick={toggleComment}
            aria-label="comment"
            sx={{ color: "white" }}
          >
            <ModeCommentIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ color: "white" }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ marginBottom: 2, color: "white" }}>
              Descriptions:
            </Typography>
            <Typography sx={{ marginBottom: 2, color: "white" }}>
              {post.content || "No additional details provided"}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      {showComment && <Comment postId={post.post_id} onClose={toggleComment} />}
    </Box>
  );
}