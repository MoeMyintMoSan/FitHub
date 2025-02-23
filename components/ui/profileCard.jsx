"use client";

import React, { useState, useEffect, useRef } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardContent, CssBaseline, GlobalStyles } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import CustomButton from "./profileButtons";
import CusBox from "./cusBox";
import DetailBox from './detailBox';
import Post from "./post";

export default function ProfileCard({ user1, user2 }) {

  const [showButtonBP, setShowButtonBP] = useState(false);
  const [showButtonD, setShowButtonD] = useState(false);
  const [showButtonP, setShowButtonP] = useState(false);
  const [showButtonR, setShowButtonR] = useState(false);
  const [showButtonL, setShowButtonL] = useState(false);
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [registerText, setRegisterText] = useState("REGISTER");
  const [likeText, setLikeText] = useState("LIKE");

  const [hasChanges, setHasChanges] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editDisable, setEditDisable] = useState(false);

  const [currentUserData, setCurrentUserData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [proData, setProData] = useState(null);
  const [postData, setPostData] = useState([]);

  const self = user1 === user2;
  const currentUserFetched = useRef(false);
  const userFetched = useRef(false);
  const proDataFetched = useRef(false);

  useEffect(() => {
    if (!userFetched.current && user2) {  // Prevents duplicate fetch
      userFetched.current = true;

      fetch(`/api/users?email=${encodeURIComponent(user2)}`)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched user:", data);
          setUserData(data);
          setOriginalUserData(data);
        })
        .catch(error => console.error("Error fetching user:", error));
    }
  }, [user2]);

  useEffect(() => {
    if (
      userData?.user_type !== 'Athlete' &&
      userData?.user_id &&
      !proDataFetched.current // Check before running fetch
    ) {
      console.log("Fetching professional data...");
      proDataFetched.current = true; // Prevents multiple fetches

      Promise.all([
        fetch(`/api/users/professionals/bio?user_id=${encodeURIComponent(userData?.user_id)}`)
          .then(response => response.json()),
        fetch(`/api/users/professionals/data?user_id=${encodeURIComponent(userData?.user_id)}`)
          .then(response => response.json()),
        fetch(`/api/users/professionals/post?user_id=${encodeURIComponent(userData?.user_id)}`)
          .then(response => response.json())
      ])
        .then(([bioData, proData, postData]) => {
          console.log("Fetched professional bio:", bioData);
          console.log("Fetched professional data:", proData);
          console.log("Fetched professional post:", postData);

          setUserData(prev => ({ ...prev, ...bioData }));
          setOriginalUserData(prev => ({ ...prev, ...bioData }));
          setProData(proData);
          setPostData(postData || []);

          if (proData?.likePro?.count > 10) {
            setShowCheckMark(true);
          } else {
            setShowCheckMark(false);
          }
        })
        .catch(error => console.error("Error fetching professional data:", error));
    }
  }, [userData, self, registerText, likeText]); // userData only changes once

  useEffect(() => {
    if (self) {
      setEditDisable(false);
      setShowDetails(true);
      if (userData?.user_type === 'Athlete') {
        setShowButtonBP(true);
        setShowButtonD(false);
        setShowButtonP(false);
        setShowButtonR(false);
        setShowButtonL(false);
      } else {
        setShowButtonBP(false);
        setShowButtonP(true);
        setShowButtonD(false);
        setShowButtonR(false);
        setShowButtonL(false);
      }
    } else {
      setEditDisable(true);
      if (userData?.user_type === 'Athlete') {
        setShowButtonBP(false);
        setShowButtonD(false);
        setShowButtonP(false);
        setShowButtonR(false);
        setShowButtonL(false);
        setShowDetails(true);
      } else {
        if (!currentUserFetched.current && user1) {  // Prevent duplicate fetch for current user
          currentUserFetched.current = true;

          fetch(`/api/users/currentUsers?email=${encodeURIComponent(user1)}`)
            .then(response => response.json())
            .then(data => {
              console.log("Fetched current user:", data);
              setCurrentUserData(data); // Set the fetched data into state
            })
            .catch(error => console.error("Error fetching current user:", error));
        }
        setShowButtonBP(false);
        setShowButtonD(true);
        setShowButtonP(false);
        setShowDetails(false);
      }
    }
  }, [userData, self]);

  useEffect(() => {
    if (proDataFetched.current && currentUserData?.user_type === "Athlete" && userData?.user_type !== "Athlete") {
      fetch(`/api/users/currentUsers/statusRL?userId1=${encodeURIComponent(currentUserData?.user_id)}&userId2=${encodeURIComponent(userData?.user_id)}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched user status:", data);
          setRegisterText(data.isRegistered ? "UNREGISTER" : "REGISTER"); // Toggle text
          setLikeText(data.isLiked ? "UNLIKE" : "LIKE"); // Toggle text
          setShowButtonR(data.isRegistered || data.permission);
          setShowButtonL(true);
        })
        .catch((error) => {
          console.error("Error fetching user status:", error);
          setShowButtonR(false);
          setShowButtonL(false);
        });
    } else {
      setShowButtonR(false);
      setShowButtonL(false);
    }
  }, [currentUserData]); // Dependencies to re-run effect when they change  

  const handleRegisterClick = () => {
    const action = registerText === "REGISTER" ? "register" : "unregister";
  
    fetch(`/api/users/currentUsers/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ athlete_id: currentUserData?.user_id, professional_id: userData?.user_id, action }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRegisterText(action === "register" ? "UNREGISTER" : "REGISTER"); // Toggle button text
          proDataFetched.current = false;
        }
      })
      .catch((error) => console.error("Error updating registration:", error));
  };

  const handleLikeClick = () => {
    const action = likeText === "LIKE" ? "like" : "unlike"; // Toggle action

    fetch(`/api/users/currentUsers/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ athlete_id: currentUserData?.user_id, professional_id: userData?.user_id, action }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLikeText(action === "like" ? "UNLIKE" : "LIKE"); // Toggle button text
          proDataFetched.current = false;
        }
      })
      .catch((error) => console.error("Error updating like:", error));
  };

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
    fetch(`/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Changes saved:", data);
          setOriginalUserData(userData);  // Update original data
          setHasChanges(false);
        } else {
          console.error("Error saving changes:", data.error);
        }
      })
      .catch(error => console.error("Error saving changes:", error));
  };

  const toggleDetailsAndPage = () => {
    setShowDetails((prev) => !prev);
    setShowButtonD((prev) => !prev);
    setShowButtonP((prev) => !prev);
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSpecialitySelect = (speciality) => {
    console.log("Selected Speciality:", speciality);
    fetch(`/api/users/professionals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userData?.user_id, user_type: speciality }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Success:", data);
          window.location.reload();
        } else {
          console.error("Error updating speciality:", data.error);
        }
      })
      .catch(error => console.error("Error updating speciality:", error));
    handleCloseModal();
  };

  const formatDate = (utcDate) => {
    if (!utcDate) return "";  // Handle null values safely
    const date = new Date(utcDate);
    return date.toISOString().split("T")[0]; // Extract only YYYY-MM-DD
  };
  console.log("User Data:", userData);
  console.log("Post Data:", postData);
  console.log("Pro Data:", proData);
  console.log("Current User Data:", currentUserData);

  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles styles={{ "html, body": { margin: 0, padding: 0, width: "100%", height: "100%" } }} />
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
                  <CustomButton type={2} onClick={handleRegisterClick}>
                    {registerText}
                  </CustomButton>
                )}
                {showButtonL && (
                  <CustomButton type={2} onClick={handleLikeClick}>
                    {likeText}
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
                      {userData?.user_type}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem", // Increase subheader font size
                        color: "#FFFFFF",
                        whiteSpace: "pre-line"
                      }}
                    >
                      {userData?.bio}
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
                  <DetailBox dataTitle="Display Name" dataValue={userData?.user_name} onChange={(value) => handleInputChange(1, value)} disable={editDisable} />
                  <DetailBox dataTitle="Weight" dataValue={userData?.weight} onChange={(value) => handleInputChange(2, value)} disable={editDisable} />
                  <DetailBox dataTitle="Height" dataValue={userData?.height} onChange={(value) => handleInputChange(3, value)} disable={editDisable} />
                  <DetailBox dataTitle="Date Of Birth" dataValue={formatDate(userData?.date_of_birth)} disable={true} />
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
                  <DetailBox dataTitle={"Body Description"} dataValue={userData?.body_description} type="yes" onChange={(value) => handleInputChange(6, value)} disable={editDisable} />
                  <DetailBox dataTitle={"Diet Description"} dataValue={userData?.diet_description} type="yes" onChange={(value) => handleInputChange(7, value)} disable={editDisable} />
                  {userData?.user_type !== 'Athlete' && (
                    <DetailBox dataTitle={"Bio"} dataValue={userData?.bio} type="yes" onChange={(value) => handleInputChange(8, value)} disable={editDisable} />
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
                  {/* <CusBox test1={"Posts"} test2={proData?.posts?.count} type={1}></CusBox> */}
                  <CusBox test1={"Posts"} test2={postData?.length || 0 } type={1}></CusBox>
                  <CusBox test1={"Registered"} test2={proData?.registered?.count + " / 10"} type={1}></CusBox>
                  <CusBox test1={"Likes"} test2={proData?.likePro?.count} type={1}></CusBox>
                </Box>
                <Typography>
                  Posts
                </Typography>
                {postData?.length > 0 ? (
                  postData.map((post) => {
                    console.log("Rendering post:", post.post_id);
                    return <CusBox key={post.post_id} type={2} obj={<Post key={post.post_id} post_id={post.post_id} email={user2} />} />;
                  })
                  ) : (
                  <p>No posts available</p>
                )}
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
              <CusBox test1={"/img/image_5.png"} test2={'Trainer'} type={3} onSelect={handleSpecialitySelect}></CusBox>
              <CusBox test1={"/img/image_6.png"} test2={'Nutritionist'} type={3} onSelect={handleSpecialitySelect}></CusBox>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment >
  );
}