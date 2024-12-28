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
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import ModeCommentIcon from '@mui/icons-material/ModeComment';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mr:20 , mt: 2}}>
      <Card sx={{ maxWidth: 900, borderRadius: 2, bgcolor: '#2B2231' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              K
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{color: "white"}}>
              <MoreVertIcon />
            </IconButton>
          }
          title="KyawGyi_Fitness"
          subheader="September 14, 2016"
          sx={{ color: blueGrey[50] }}
          subheaderTypographyProps={{ sx: { color: blueGrey[200] } }}
        />
        <Grid container>
          <Grid item xs={6} sx={{ml: 2}}>
            <CardMedia
              component="img"
              image="https://images.everydayhealth.com/images/healthy-living/fitness/everything-you-need-know-about-fitness-1440x810.jpg"
              alt="Paella dish"
              sx={{ height: "250px", width: "550px", borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={5}  sx ={{ml:2}}>
            <CardContent>
              <Typography variant="body2" sx={{ color: "white", fontSize: 18}}>
                Beginner guide to weight loss and fitness
              </Typography>
            </CardContent>
            <Grid container sx ={{ml:2}}>
                <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14}}>
                        Exercises
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2,pb:0.5, borderRadius:1}}>
                        Sit Ups
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2,pb:0.5, borderRadius:1}}>
                        Push Ups
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2,pb:0.5, borderRadius:1}}>
                        Walking Lunge
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14}}>
                        Reps
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        60
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        30
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        30
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14}}>
                        Sets
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        2
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        3
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        3
                    </Typography>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" sx={{ color: "white" }}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" sx={{ color: "white"}}>
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
              DO NOT forget to rest betweeen each sets and stay hydrated.
            </Typography>
            <Typography sx={{ marginBottom: 2, color: "white" }}>
                For the ladies, push can be done with knees on the floor. It is easier and less stressful.Lunges can be done with or without weights. It is advisable to start without weights.
            </Typography>
            <Typography sx={{ marginBottom: 2, color: "white" }}>
                These exercises are beginner friendly and can be done at home. If you have mats, you can use them. If not, you can use a towel or a carpet. Weights are not necessary but can be used to increase the intensity of the workout. You can do this 4 times a week and see the results in a month!
            </Typography>
            <Typography sx={{color: "white" }}>
                Stay healthy and fit!
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
