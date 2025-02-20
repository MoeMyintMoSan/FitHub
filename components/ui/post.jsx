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
import { blueGrey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Box, Grid, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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

export default function Post({ post_id, email }) {
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  const [listGroups, setListGroups] = React.useState([]);
  const router = useRouter();
  const [like, setLike] = React.useState(false);

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
            items: data.details.map((d) => ({ exercise: d.exercise, reps: d.reps, sets: d.sets })),
          });
        } else if (data.content_type === "Nutritionist") {
          groups.push({
            title: "Food Items",
            items: data.details.map((d) => ({ food: d.food, calories: d.calories })),
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

  const handleLikeClick = async () => {
    try {
      if (!like) {
        const res = await fetch(`/api/like/${post_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        console.log(res);
        if (res.ok) {
          setLike(true);
        }
      } else {
        const res = await fetch(`/api/like/${post_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        console.log(res);
        if (res.ok) {
          setLike(false);
        }
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };
  const handleCardHeaderClick = () => {
    if (post && post.professional_id) {
      router.push(`/profile?user_id=${post.professional_id}`);
    }
  };

  const formatDate = (utcDate) => {
    if (!utcDate) return "";  // Handle null values safely
    const date = new Date(utcDate);
    return date.toISOString().split("T")[0]; // Extract only YYYY-MM-DD
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Post not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Card
        sx={{
          maxWidth: 800,
          borderRadius: 2,
          bgcolor: post.content_type === "Trainer" ? "#2B2231" : post.content_type === "Nutritionist" ? "#222F31" : "#2B2231",
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
          subheader={formatDate(post.created_date)}
          sx={{ color: blueGrey[50], cursor: "pointer" }}
          subheaderTypographyProps={{ sx: { color: blueGrey[200] } }}
          onClick={handleCardHeaderClick}
        />

        <Grid container sx={{ width: "800px" }}>
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
                  <Typography variant="body2" sx={{
                        color: "white",
                        fontSize: 14,
                        pt: 0.5,
                        pl: 1,
                        mr: 2,
                        pb: 0.5,
                        borderRadius: 1,
                      }}>
                    {group.title}
                  </Typography>
                  {group.items.map((item, index) => (
                    <Grid container spacing={2} key={index} sx={{ pt: 1 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{
                        color: "white",
                        fontSize: 14,
                        bgcolor: "#283138",
                        pt: 0.5,
                        pl: 1,
                        mr: 2,
                        pb: 0.5,
                        borderRadius: 1,
                      }}>
                          {item.food || item.exercise}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{
                        color: "white",
                        fontSize: 14,
                        bgcolor: "#283138",
                        pt: 0.5,
                        pl: 1,
                        mr: 2,
                        pb: 0.5,
                        borderRadius: 1,
                      }}>
                          {item.calories || `${item.reps} Reps, ${item.sets} Sets`}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <CardActions disableSpacing>
          <IconButton onClick={handleLikeClick} aria-label="add to favorites" sx={{ color: like ? "red" : "white" }}>
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={toggleComment} aria-label="comment" sx={{ color: "white" }}>
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
            <Typography sx={{ marginBottom: 2, color: "white" }}>Descriptions:</Typography>
            <Typography sx={{ marginBottom: 2, color: "white" }}>
              {post.content || "No additional details provided"}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      {showComment && <Comment postId={post.post_id} email={email} onClose={toggleComment} />}
    </Box>
  );
}
