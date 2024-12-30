"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { blueGrey } from "@mui/material/colors";
import { CssBaseline, GlobalStyles } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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
  const [showButtonBP, setShowButtonBP] = React.useState(false);
  const [showButtonD, setShowButtonD] = React.useState(false);
  const [showButtonP, setShowButtonP] = React.useState(false);
  const [showButtonR, setShowButtonR] = React.useState(true);
  const [showButtonL, setShowButtonL] = React.useState(true);
  const [showCheckMark, setShowCheckMark] = React.useState(true);
  const [showDetails, setShowDetails] = React.useState(true);

  const [fields, setFields] = React.useState(initialFields);
  const [hasChanges, setHasChanges] = React.useState(false);

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

  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html, body": {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden", // Prevent scrollbars
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
          height: "80vh", // Use viewport height
          marginLeft: "2%",
          marginTop: "2%",
          overflow: "hidden",
          backgroundColor: "#2B2231",
          borderRadius: 3,
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "100%",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "40px",
            borderRadius: 2,
            bgcolor: "#2B2231",
          }}
        >
          <CardHeader
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
                  height: "110px",
                  gap: 1,
                }}
              >
                {showButtonBP && (
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      textTransform: "none",
                      border: "1px solid #ED6262", // Custom border color
                      bgcolor: "#2A3236", // Custom button color
                      color: "#ED6262", // Customize text color
                      "&:hover": {
                        bgcolor: blueGrey[600], // Button hover color
                      },
                    }}
                  >
                    BECOME PRO
                  </Button>
                )}

                {showButtonD && (
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      textTransform: "none",
                      border: "1px solid #ED6262", // Custom border color
                      bgcolor: "#2A3236", // Custom button color
                      color: "#ED6262", // Customize text color
                      "&:hover": {
                        bgcolor: blueGrey[600], // Button hover color
                      },
                    }}
                  >
                    DETAILS
                  </Button>
                )}

                {showButtonP && (
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      textTransform: "none",
                      border: "1px solid #ED6262", // Custom border color
                      bgcolor: "#2A3236", // Custom button color
                      color: "#ED6262", // Customize text color
                      "&:hover": {
                        bgcolor: blueGrey[600], // Button hover color
                      },
                    }}
                  >
                    PAGE
                  </Button>
                )}

                {showButtonR && (
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      textTransform: "none",
                      bgcolor: "#ED6262", // Custom button color
                      color: "#CFCFD0", // Customize text color
                      "&:hover": {
                        bgcolor: blueGrey[600], // Button hover color
                      },
                    }}
                  >
                    REGISTER
                  </Button>
                )}
                {showButtonL && (
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      textTransform: "none",
                      bgcolor: "#ED6262", // Custom button color
                      color: "#CFCFD0", // Customize text color
                      "&:hover": {
                        bgcolor: blueGrey[600], // Button hover color
                      },
                    }}
                  >
                    LIKE
                  </Button>
                )}
              </Box>
            }
            title={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                KyawGyi_Fitness
                {showCheckMark && (
                  <CheckCircleIcon
                    sx={{
                      color: "green", // Green color for checkmark
                      fontSize: "1.5rem", // Adjust size as needed
                    }}
                  />
                )}
              </div>
            }
            titleTypographyProps={{
              sx: {
                fontSize: "2rem", // Increase title font size
                fontWeight: "bold",
                color: "#FFFFFF",
              },
            }}
            subheader="kyawgyi.fitness@gmail.com"
            subheaderTypographyProps={{
              sx: {
                fontSize: "1rem", // Increase subheader font size
                color: "#FFFFFF",
              },
            }}
          />
          {showDetails && (
            <>
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
                          width: "100%", // Full width, you can change to any specific size like 300px
                          height: "1rem+10px", // Adjust height of the text field
                          "& .MuiInputBase-input": {
                            fontSize: "1rem", // Change font size of the input text
                            padding: "5px", // Adjust padding inside the text field
                          },
                          backgroundColor: "#2A3236",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "transparent", // Make the border transparent by default
                            },
                            "&:hover fieldset": {
                              borderColor: "transparent", // Ensure border remains transparent on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "transparent", // Keep border transparent when focused
                            }
                          }
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
                    <Box key={field.id}
                      sx={{
                        height: "(100%-30px)/3",
                      }}>
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
                        rows={2} // Set initial number of rows
                        sx={{
                          width: "100%", // Full width, you can change to any specific size like 300px
                          height: "80%", // Adjust height of the text field
                          "& .MuiInputBase-input": {
                            fontSize: "1rem", // Change font size of the input text
                            padding: "5px", // Adjust padding inside the text field
                          },
                          backgroundColor: "#2A3236",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "transparent", // Make the border transparent by default
                            },
                            "&:hover fieldset": {
                              borderColor: "transparent", // Ensure border remains transparent on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "transparent", // Keep border transparent when focused
                            }
                          }
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
                  <Button
                    variant="contained"
                    onClick={() => alert("Changes saved!")}
                    sx={{
                      bgcolor: "#ED6262",
                      color: "#FFFFFF",
                      textTransform: "none",
                      "&:hover": { bgcolor: blueGrey[600] },
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </>
          )}
        </Card>
      </Box>
    </React.Fragment>
  );
}