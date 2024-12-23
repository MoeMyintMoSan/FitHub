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
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Card sx={{ maxWidth: 900, borderRadius: 2, bgcolor: '#222F31' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{color: "white"}}>
              <MoreVertIcon />
            </IconButton>
          }
          title="Rachael_healthynutrition"
          subheader="September 14, 2016"
          sx={{ color: blueGrey[50] }}
          subheaderTypographyProps={{ sx: { color: blueGrey[200] } }}
        />
        <Grid container>
          <Grid item xs={6} sx={{ml: 2}}>
            <CardMedia
              component="img"
              image="https://cdn-abioh.nitrocdn.com/iRwsMXPEdaMSNBlSqLBkXmjSJwoqRrps/assets/images/optimized/rev-01bf621/www.apinchofhealthy.com/wp-content/uploads/2022/10/Styled-baked-chicken-breast-8-2.jpg"
              alt="Paella dish"
              sx={{ height: "250px", width: "550px", borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={5}  sx ={{ml:2}}>
            <CardContent>
              <Typography variant="body2" sx={{ color: "white", fontSize: 18}}>
                Diet Plan to Maintain a Healthy Body
              </Typography>
            </CardContent>
            <Grid container sx ={{ml:2}}>
                <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14}}>
                        Food
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2,pb:0.5, borderRadius:1}}>
                        Chicken Brest
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2,pb:0.5, borderRadius:1}}>
                        Broccoli
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2,pb:0.5, borderRadius:1}}>
                        Brown Rice
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14}}>
                        Calories
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        200
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        50
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontSize: 14, bgcolor:"#283138",mt:1, pt:0.5, pl:1, mr:2, pb:0.5, borderRadius:1}}>
                        100
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
                This diet is for those who already have a healthy body and want to maintain it! 
            </Typography>
            <Typography sx={{ marginBottom: 2, color: "white" }}>
                It is a balanced diet that includes protein, carbohydrates, and vegetables. It is important to eat a variety of foods to get all the nutrients your body needs. This diet plan is easy to follow and can help you maintain a healthy body weight.
            </Typography>
            <Typography sx={{ marginBottom: 2, color: "white" }}>
                Try this meal plan for a week and see how you feel. If you like it, you can continue with it. If not, you can always try something else. Remember, it is important to listen to your body and eat when you are hungry. Do not skip meals or restrict your food intake.
            </Typography>
            <Typography sx={{color: "white" }}>
                Enjoy your healthy eating journey!
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
