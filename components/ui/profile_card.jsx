"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardContent, CssBaseline, GlobalStyles } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import CustomButton from "./profileButtons";
import CusBox from "./cusBox";
import Post from "./post";

export default function ProfileCard() {
  // Example fields for profile information
  const initialFields = [
    { id: 1, title: "Name", value: "AA" },
    { id: 2, title: "Email", value: "example@gmail.com" },
    { id: 3, title: "Phone", value: "+123456789" },
    { id: 4, title: "Location", value: "City" },
    { id: 5, title: "Age", value: "25" },
    { id: 6, title: "Height", value: "5'10\"" },
    { id: 7, title: "Weight", value: "150 lbs\n150 lbs" },
    { id: 8, title: "Goals", value: "Stay Fit\nStay Fit\nStay Fit" },
  ];
  // Example conditions for visibility
  const [showButtonBP, setShowButtonBP] = React.useState(true);
  const [showButtonD, setShowButtonD] = React.useState(true);
  const [showButtonP, setShowButtonP] = React.useState(false);
  const [showButtonR, setShowButtonR] = React.useState(false);
  const [showButtonL, setShowButtonL] = React.useState(false);
  const [showCheckMark, setShowCheckMark] = React.useState(true);
  const [showDetails, setShowDetails] = React.useState(false);

  const [fields, setFields] = React.useState(initialFields);
  const [hasChanges, setHasChanges] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleInputChange = (id, newValue) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value: newValue } : field
    );

    setFields(updatedFields);

    // Check if there are changes compared to initial values
    const changesExist = updatedFields.some(
      (field, index) => field.value !== initialFields[index].value
    );
    setHasChanges(changesExist);
  };

  const saveChanges = () => {
    console.log("Changes saved:", fields);
    setHasChanges(false);
  };

  const toggleDetailsAndPage = () => {
    setShowDetails((prev) => !prev);
    setShowButtonD((prev) => !prev);
    setShowButtonP((prev) => !prev);
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html, body": {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%"
          },
        }}
      />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card
          sx={{
            width: 900,
            padding: 5,
            borderRadius: 2,
            bgcolor: "#2B2231",
          }}
        >
          <CardHeader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: "#FF9999",
                  width: 100, // Increase avatar size
                  height: 100,
                  fontSize: 50, // Larger font size for initials
                }}
                aria-label="recipe"
              >
                K
              </Avatar>
            }
            action={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: 2,
                  gap: 1,
                }}
              >
                {showButtonBP && (
                  <CustomButton type={1} onClick={() => { handleOpenModal(); console.log('BECOME PRO clicked'); }}>
                    BECOME PRO
                  </CustomButton>
                )}
                {showButtonD && (
                  <CustomButton type={1} onClick={() => { toggleDetailsAndPage(); console.log('DETAILS clicked'); }}>
                    DETAILS
                  </CustomButton>
                )}
                {showButtonP && (
                  <CustomButton type={1} onClick={() => { toggleDetailsAndPage(); console.log('PAGE clicked'); }}>
                    PAGE
                  </CustomButton>
                )}
                {showButtonR && (
                  <CustomButton type={2} onClick={() => console.log('REGISTER clicked')}>
                    REGISTER
                  </CustomButton>
                )}
                {showButtonL && (
                  <CustomButton type={2} onClick={() => console.log('LIKE clicked')}>
                    LIKE
                  </CustomButton>
                )}
              </Box>
            }
            title={
              <Box sx={{ marginTop: 2 }} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                KyawGyi_Fitness
                {showCheckMark && (
                  <CheckCircleIcon
                    sx={{
                      color: "green", // Green color for checkmark
                      fontSize: "1.5rem", // Adjust size as needed
                    }}
                  />
                )}
              </Box>
            }
            titleTypographyProps={{
              sx: {
                fontSize: "2rem", // Increase title font size
                fontWeight: "bold",
                color: "#FFFFFF",
              },
            }}
            subheader={
              <Box>
                <Typography
                  sx={{
                    fontSize: "1rem", // Increase subheader font size
                    color: "#FFFFFF",
                  }}
                >
                  kyawgyi.fitness@gmail.com
                </Typography>
                {!showDetails && (
                  <div>
                    <Typography
                      sx={{
                        fontSize: "1.25rem", // Increase subheader font size
                        color: "#FF9999",
                      }}
                    >
                      Trainer
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem", // Increase subheader font size
                        color: "#FFFFFF",
                        whiteSpace: "pre-line"
                      }}
                    >
                      Just started my trainer journey. Let's get fit together!
                    </Typography>
                  </div>
                )}
              </Box>
            }
          />
          {showDetails && (
            <CardContent>
              {/* Content Area */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
                  gap: 3,
                }}
              >
                {/* Left Fields */}
                <Box sx={{
                  flex: "1",
                  minWidth: "300px",
                  display: "grid", // Use grid layout
                  gap: "10px", // Adjust the gap between the boxes
                  width: "100%",
                }}>
                  {fields.slice(0, 5).map((field) => (
                    <Box key={field.id}>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: "bold", color: "#849298" }}
                      >
                        {field.title}
                      </Typography>
                      <TextField
                        value={field.value}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": {
                            fontSize: "1.25rem", // Change font size of the input text
                            padding: "10px", // Adjust padding inside the text field
                          },
                          backgroundColor: "#2A3236",
                        }}
                        inputProps={{ style: { color: "#FFFFFF" } }}
                      />
                    </Box>
                  ))}
                </Box>

                {/* Right Column */}
                <Box sx={{
                  flex: "1",
                  minWidth: "300px",
                  display: "grid", // Use grid layout
                  gap: "10px", // Adjust the gap between the boxes
                  width: "100%",
                }}>
                  {fields.slice(5).map((field) => (
                    <Box key={field.id}>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: "bold", color: "#849298" }}
                      >
                        {field.title}
                      </Typography>
                      <TextField
                        value={field.value}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline // Enable multiline
                        sx={{
                          width: "100%", // Full width, you can change to any specific size like 300px
                          "& .MuiInputBase-input": {
                            fontSize: "1.25rem", // Change font size of the input text
                            padding: "10px", // Adjust padding inside the text field
                          },
                          backgroundColor: "#2A3236",
                        }}
                        inputProps={{ style: { color: "#FFFFFF" } }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Save Changes Button */}
              {hasChanges && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 1.5,
                  }}
                >
                  <CustomButton type={2} onClick={() => { saveChanges(); console.log("Changes saved!"); }}>
                    Save Changes
                  </CustomButton>
                </Box>
              )}
            </CardContent>
          )}
          {!showDetails && (
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: 700,
                  gap: 2,
                  color: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                    borderRadius: 2,
                    padding: 2,
                    backgroundColor: "#2C3134",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" // Add shadow effect
                  }}
                >
                  <CusBox test1={"Posts"} test2={"2"} type={1}></CusBox>
                  <CusBox test1={"Registered"} test2={"1/10"} type={1}></CusBox>
                  <CusBox test1={"Likes"} test2={"1"} type={1}></CusBox>
                </Box>
                <Typography>
                  Posts
                </Typography>
                <CusBox type={2} obj={<Post
                  type="trainer"
                  avatarLabel="K"
                  title="KyawGyi_Fitness"
                  subheader="December 28, 2024"
                  image="https://images.everydayhealth.com/images/healthy-living/fitness/everything-you-need-know-about-fitness-1440x810.jpg"
                  imageAlt="Fitness"
                  mainContent="Beginner guide to weight loss and fitness"
                  listItems={["Sit Ups", "Push Ups", "Lunges"]}
                  secondaryListItems={["60", "30", "30"]}
                  tertiaryListItems={["2", "3", "3"]}
                  expandedDescriptions={[
                    "DO NOT forget to rest between each set and stay hydrated.",
                    "These exercises are beginner-friendly and can be done at home. Stay healthy and fit!",
                  ]}
                />}>
                </CusBox>
              </Box>
            </CardContent>
          )}
        </Card>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="become-pro-modal-title"
        aria-describedby="become-pro-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            height: "70%",
            backgroundColor: "#5C646A",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            p: 5,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 10,
              top: 10,
              color: "#FFFFFF",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#FFFFFF",
              gap: 5
            }}
          >
            <Typography variant="h4">
              CHOOSE YOUR SPECIALITY
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly", 
                width: "100%"
              }}
            >
              <CusBox test1={"/img/image_5.png"} test2={"TRAINER"} type={3} obj={handleCloseModal}></CusBox>
              <CusBox test1={"/img/image_6.png"} test2={"NUTRITIONIST"} type={3} obj={handleCloseModal}></CusBox>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment >
  );
}