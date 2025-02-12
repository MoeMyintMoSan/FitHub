"use client";

import React, { useState, useEffect } from 'react';
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
import DetailBox from '../detailBox';
import Post from "./post";

export default function ProfileCard({ user1, user2 }) {
  const [userData, setUserData] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  
  const [showButtonBP, setShowButtonBP] = useState(false);
  const [showButtonD, setShowButtonD] = useState(false);
  const [showButtonP, setShowButtonP] = useState(false);
  const [showButtonR, setShowButtonR] = useState(false);
  const [showButtonL, setShowButtonL] = useState(false);
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const [hasChanges, setHasChanges] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const self = user1 === user2;

  useEffect(() => {
    fetch(`/api/users?email=${encodeURIComponent(user2)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched user:", data);
        setUserData(data);  // Store fetched data in state
        setOriginalUserData(data);  // Store original data in state
      })
      .catch(error => console.error("Error fetching user:", error));

    if (self) {
      setShowButtonBP(true);
      setShowButtonD(false);
      setShowButtonP(false);
      setShowButtonR(false);
      setShowButtonL(false);
      setShowCheckMark(false);
      setShowDetails(true);
    }
  }, [user1, user2]);
  
  async function checkCondition(user1, user2) {
    if (user1 === user2) {
      setShowButtonBP(true);
      setShowButtonD(false);
      setShowButtonP(false);
      setShowButtonR(false);
      setShowButtonL(false);
      setShowCheckMark(false);
      setShowDetails(true);
    } else {
      //     const userType = "ath_to_ath";
      // const initialStates = user1 === user2
      // ? {
      //     showButtonBP: false,
      //     showButtonD: true,
      //     showButtonP: false,
      //     showButtonR: false,
      //     showButtonL: false,
      //     showCheckMark: true,
      //     showDetails: false
      //   }
      // : userType === "ath_own"
      // ? {
      //     showButtonBP: true,
      //     showButtonD: false,
      //     showButtonP: false,
      //     showButtonR: false,
      //     showButtonL: false,
      //     showCheckMark: false,
      //     showDetails: true
      //   }
      //   : userType === "pro_other"
      // ? {
      //     showButtonBP: false,
      //     showButtonD: false,
      //     showButtonP: true,
      //     showButtonR: false,
      //     showButtonL: false,
      //     showCheckMark: false,
      //     showDetails: true
      //   }
      // : userType === "ath_to_ath"
      // ? {
      //     showButtonBP: false,
      //     showButtonD: false,
      //     showButtonP: false,
      //     showButtonR: false,
      //     showButtonL: false,
      //     showCheckMark: false,
      //     showDetails: true
      //   }
      // : {//ath to pro
      //     showButtonBP: false,
      //     showButtonD: true,
      //     showButtonP: false,
      //     showButtonR: true,
      //     showButtonL: true,
      //     showCheckMark: false,
      //     showDetails: false
      //   };
    }
  }

  const handleInputChange = (field, value) => {
    setUserData((prev) => {
      const updatedData = { ...prev };
      switch (field) {
        case 1:
          updatedData.user_name = value;
          break;
        case 2:
          updatedData.weight = value;
          break;
        case 3:
          updatedData.height = value;
          break;
        case 4:
          updatedData.date_of_birth = value;
          break;
        case 5:
          updatedData.user_password = value;
          break;
        case 6:
          updatedData.body_description = value;
          break;
        case 7:
          updatedData.diet_description = value;
          break;
        case 8:
          updatedData.bio = value;
          break;
        default:
          break;
      }
          // Compare updated data with original
    const hasChanged = JSON.stringify(updatedData) !== JSON.stringify(originalUserData);
    setHasChanges(hasChanged);
    
    return updatedData;
    });
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

  const formatDate = (utcDate) => {
    if (!utcDate) return "";  // Handle null values safely
    const date = new Date(utcDate);
    return date.toISOString().split("T")[0]; // Extract only YYYY-MM-DD
  };  

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
            bgcolor: userData?.user_type === 'Athlete' ? "#181D21" : (userData?.user_type === 'Trainer' ? "#2B2231" : "#222F31"),
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
                {userData?.user_name[0]} {/* Display first letter of the name */}
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
                {userData?.user_name}
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
                  {userData?.email}
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
                {/* Left Column */}
                <Box sx={{
                  flex: "1",
                  minWidth: "300px",
                  display: "grid", // Use grid layout
                  gap: "10px", // Adjust the gap between the boxes
                  width: "100%",
                }}>
                  <DetailBox dataTitle="Display Name" dataValue={userData?.user_name} onChange={(value) => handleInputChange(1, value)} />
                  <DetailBox dataTitle="Weight" dataValue={userData?.weight} onChange={(value) => handleInputChange(2, value)} />
                  <DetailBox dataTitle="Height" dataValue={userData?.height} onChange={(value) => handleInputChange(3, value)} />
                  <DetailBox dataTitle="Date Of Birth" dataValue={formatDate(userData?.date_of_birth)} disable={true}/>
                  {self && (<DetailBox dataTitle="Password" dataValue={userData?.user_password} onChange={(value) => handleInputChange(5, value)} />)}
                </Box>

                {/* Right Column */}
                <Box sx={{
                  flex: "1",
                  minWidth: "300px",
                  display: "grid", // Use grid layout
                  gap: "10px", // Adjust the gap between the boxes
                  width: "100%",
                }}>
                  <DetailBox dataTitle={"Body Description"} dataValue={userData?.body_description} type="yes" onChange={(value) => handleInputChange(6, value)} />
                  <DetailBox dataTitle={"Diet Description"} dataValue={userData?.diet_description} type="yes" onChange={(value) => handleInputChange(7, value)} />
                  {userData?.user_type !== 'Athlete' && (
                    <DetailBox dataTitle={"Bio"} dataValue={"Stay Fit\nStay Fit\nStay Fit"} type="yes" onChange={(value) => handleInputChange(8, value)} />
                  )}
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