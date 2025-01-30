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
import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
const Comment = dynamic(() => import("./comment"), { ssr: false });

// ExpandMore IconButton Styling
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


export default function Post({
  type,
  avatarLabel = "R",
  title = "Default Title",
  subheader = "Default Date",
  image = "https://via.placeholder.com/550x250",
  imageAlt = "Default Image",
  mainContent = "Default main content",
  listItems = [],
  secondaryListItems = [],
  tertiaryListItems = [],
  expandedDescriptions = [],
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card
        sx={{
          maxWidth: 900,
          borderRadius: 2,
          bgcolor: type === "trainer" ? "#2B2231" : "#222F31",
        }}
      >
        {/* Card Header */}
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }}>{avatarLabel}</Avatar>}
          action={
            <IconButton aria-label="settings" sx={{ color: "white" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={subheader}
          sx={{ color: blueGrey[50] }}
          subheaderTypographyProps={{ sx: { color: blueGrey[200] } }}
        />

        {/* Media and Content Section */}
        <Grid container>
          <Grid item xs={6} sx={{ ml: 2 }}>
            <CardMedia
              component="img"
              image={image}
              alt={imageAlt}
              sx={{ height: "250px", width: "550px", borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={5} sx={{ ml: 2 }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: "white", fontSize: 18 }}>
                {mainContent}
              </Typography>
            </CardContent>

            {/* Lists */}
            <Grid container sx={{ ml: 2 }} spacing={2}>
              <Grid item xs={4}>
                {listItems.length > 0 && (
                  <>
                    <Typography
                      variant="body2"
                      sx={{ color: "white", fontSize: 14 }}
                    >
                      {type === "trainer" ? "Exercises" : "Food"}
                    </Typography>
                    {listItems.map((item, index) => (
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
                  </>
                )}
              </Grid>
              <Grid item xs={4}>
                {secondaryListItems.length > 0 && (
                  <>
                    <Typography
                      variant="body2"
                      sx={{ color: "white", fontSize: 14 }}
                    >
                      {type === "trainer" ? "Reps" : "Calories"}
                    </Typography>
                    {secondaryListItems.map((item, index) => (
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
                  </>
                )}
              </Grid>
              {tertiaryListItems.length > 0 && type === "trainer" && (
                <Grid item xs={4}>
                  <Typography
                    variant="body2"
                    sx={{ color: "white", fontSize: 14 }}
                  >
                    Sets
                  </Typography>
                  {tertiaryListItems.map((item, index) => (
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
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" sx={{ color: "white" }}>
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

        {/* Collapsible Section */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ marginBottom: 2, color: "white" }}>
              Descriptions:
            </Typography>
            {expandedDescriptions.map((desc, index) => (
              <Typography
                key={index}
                sx={{ marginBottom: 2, color: "white" }}
              >
                {desc}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
        {/* Comment Section */}
        {showComment && <Comment onClose={toggleComment} />}
    </Box>
  );
}
