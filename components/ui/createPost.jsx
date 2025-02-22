"use client";

import * as React from "react";
import {
  Box, Fab, Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Select, MenuItem, FormControl, InputLabel, OutlinedInput,
  FormHelperText, Grid, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { UploadButton } from "./uploadthing";

export default function FormDialog({ type, email }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [fields, setFields] = React.useState([
    type === "Trainer"
      ? { exercise: "", reps: "", sets: "" }
      : { food: "", calories: "" },
  ]);
  const [accounts, setAccounts] = React.useState([]);
  const [selectedAthletes, setSelectedAthletes] = React.useState([]);
  const [visibility, setVisibility] = React.useState("Public");
  const uniqueAccounts = Array.from(new Map(accounts.map(item => [item.user_id, item])).values());

  React.useEffect(() => {
    if (visibility === "Private") {
      fetch(`/api/users?email=${encodeURIComponent(email)}`)
        .then((response) => response.json())
        .then((data) => {
          const userId = data.user_id;
          // Fetch the relevant accounts based on the user's type
          fetch(`/api/privatefeed/${userId}`)
            .then((response) => response.json())
            .then((data) => setAccounts(data))
            .catch((error) => console.error("Error fetching accounts:", error));
        })
    }
  }, [visibility, email]);


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    setImage(null); // Reset the image state
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      type === "Trainer"
        ? { exercise: "", reps: "", sets: "" }
        : { food: "", calories: "" },
    ]);
  };


  const handleFieldChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
    console.log("Fields: ", fields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("title", title);
    formData.append("content", description);
    formData.append("post_visibility", visibility); // or "Private" based on user choice
    formData.append("image", image);
    formData.append("details", JSON.stringify(fields));

    if (visibility === "Private") {
      formData.append("referenced_athletes", JSON.stringify(selectedAthletes));
    }

    const apiPath = visibility === "Public" ? "/api/posts" : `/api/privatefeed/posts`;

    try {
      console.log("posting:",selectedAthletes);
      const response = await fetch(apiPath, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Post created successfully");
        handleClose();
        window.location.reload();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <React.Fragment>
      <Box onClick={handleClickOpen} sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          aria-label="add"
          sx={{
            backgroundColor: "#ED6262",
            color: "white",
            "&:hover": {
              backgroundColor: "#FF7F7F",
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx: {
            borderRadius: 5,
            backgroundColor: "#363C40",
            width: 500,
            height: 660,
          },
        }}
      >
        <Box
          display="flex"
          sx={{
            borderRadius: 5,
            backgroundColor: "#363C40",
            width: 500,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Button sx={{ color: "white" }} onClick={handleClose}>
            <CloseIcon />
          </Button>
          <Box
            sx={{
              ml: 8,
            }}
          >
            <DialogTitle color="white">Create a new Post</DialogTitle>
          </Box>
        </Box>
        <DialogContent>
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            <TextField
              fullWidth
              label="Title"
              id="fullWidth"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputLabelProps={{
                style: { color: "white", opacity: "60%" },
              }}
              InputProps={{
                style: {
                  color: "white",
                  background: "#758187",
                  borderRadius: "7px",
                },
              }}
            />
          </Box>
          <br />
          <Box sx={{ width: 500, maxWidth: "100%", mb: 2 }}>
            <TextField
              fullWidth
              label="Description"
              id="fullWidth"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{
                style: { color: "white", opacity: "60%" },
              }}
              InputProps={{
                style: {
                  color: "white",
                  background: "#758187",
                  borderRadius: "7px",
                },
              }}
            />
          </Box>
          <Box sx={{ width: 500, maxWidth: "100%", mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Visibility</InputLabel>
            <Select value={visibility} onChange={(e) => setVisibility(e.target.value)} sx={{ background: "#758187", color: "white" }}>
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </Select>
          </FormControl>
          {visibility === "Private" && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Refer Athletes</InputLabel>
              <Select multiple value={selectedAthletes} onChange={(e) => setSelectedAthletes(e.target.value)} input={<OutlinedInput />} sx={{ background: "#758187", color: "white" }}>
                {uniqueAccounts.map((athlete) => (
                  <MenuItem key={athlete.user_id} value={athlete.user_id}>
                    {athlete.user_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          </Box>
          <Box >
            <UploadButton
             appearance={{
              button({ ready, isUploading }) {
                return {
                  background: "#758187",
                  fontSize: "14px",
                  color: "black",
                  hover: {
                    background: "#9EAAB1",
                  },
                  ...(ready && { color: "#9EAAB1" }),
                  ...(isUploading && { color: "#9EAAB1" }),
                };
              },
              container: {
                marginTop: "1rem",
              },
              allowedContent: {
                color: "#a1a1aa",
              },
            }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImage(res[0].url);
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </Box>
          {/* Dynamic Grid Fields */}
          {fields.map((field, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={4}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <FormHelperText
                    sx={{ color: "white", opacity: "60%" }}
                    id="outlined-helper-text"
                  >
                    {type === "Trainer" ? "Exercise" : "Food"}
                  </FormHelperText>
                  <OutlinedInput
                    value={type === "Trainer" ? field.exercise : field.food}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        type === "Trainer" ? "exercise" : "food",
                        e.target.value
                      )
                    }
                    aria-describedby="outlined-helper-text"
                    sx={{
                      height: "40px",
                      color: "white",
                      background: "#758187",
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <FormHelperText
                    sx={{ color: "white", opacity: "60%" }}
                    id="outlined- helper-text"
                  > 
                    {type === "Trainer" ? "Reps" : "Calories"}
                  </FormHelperText>
                  <OutlinedInput
                    value={type === "Trainer" ? field.reps : field.calories}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        type === "Trainer" ? "reps" : "calories",
                        e.target.value
                      )
                    }
                    aria-describedby="outlined-helper-text"
                    sx={{
                      height: "40px",
                      color: "white",
                      background: "#758187",
                    }}
                  />
                </FormControl>
              </Grid>
              {type === "Trainer" && (
                <Grid item xs={4}>
                  <FormControl sx={{ m: 1 }} variant="outlined">
                    <FormHelperText
                      sx={{ color: "white", opacity: "60%" }}
                      id="outlined-helper-text"
                    >
                      Sets
                    </FormHelperText>
                    <OutlinedInput
                      value={field.sets}
                      onChange={(e) =>
                        handleFieldChange(index, "sets", e.target.value)
                      }
                      aria-describedby="outlined-helper-text"
                      sx={{
                        height: "40px",
                        color: "white",
                        background: "#758187",
                      }}
                    />
                  </FormControl>
                </Grid>
              )}
            </Grid>
          ))}
          <IconButton
            onClick={handleAddField}
            sx={{
              mt: 2,
              ml: 26,
              background: "#758187",
              color: "white",
              "&:hover": {
                backgroundColor: "#9EAAB1",
                color: "black",
              },
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#ED6262",
              fontSize: "16px",
              m: 1,
              "&:hover": {
                backgroundColor: "#ED6262",
                color: "white",
              },
            }}
            type="submit"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
