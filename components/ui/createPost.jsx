"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { UploadButton } from "./uploadthing";

export default function FormDialog({ type, email }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [imageName, setImageName] = React.useState(""); // Track the uploaded file name
  const [fields, setFields] = React.useState([
    type === "Trainer"
      ? { exercise: "", reps: "", sets: "" }
      : { food: "", calories: "" },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null); // Reset the image state
    setImageName(""); // Reset the image name
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      type === "trainer"
        ? { exercise: "", reps: "", sets: "" }
        : { food: "", calories: "" },
    ]);
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Upload the file using UploadThing
      const uploadRes = await fetch("/api/uploadthing", {
        method: "POST",
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image");
      }

      const { url } = await uploadRes.json(); // Get the uploaded file URL
      setImage(url); // Store the image URL
      setImageName(file.name); // Update the UI with the file name
    } catch (error) {
      console.error("Error uploading image:", error);
      setImage(null);
      setImageName("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("title", title);
    formData.append("content", description);
    formData.append("post_visibility", "Public"); // or "Private" based on user choice
    formData.append("image", image);
    formData.append("details", JSON.stringify(fields));

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Post created successfully");
        handleClose();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            <UploadButton
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
            <Button
              fullWidth
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<AddPhotoAlternateIcon />}
              sx={{
                height: "100px",
                background: "#758187",
                borderRadius: "7px",
                "&:hover": {
                  backgroundColor: "#9EAAB1",
                  color: "black",
                },
              }}
            >
              {imageName ? `Uploaded: ${imageName}` : "Insert Photo"}
              <VisuallyHiddenInput
                type="file"
                onChange={handleImageChange}
                multiple
              />
            </Button>
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
