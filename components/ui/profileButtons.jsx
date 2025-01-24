import React from 'react';
import Button from '@mui/material/Button';
import { blueGrey } from '@mui/material/colors';

const CustomButton = ({ children, onClick, type }) => {
  return (
    <Button
      variant="contained"
      size="medium"
      sx={{
        textTransform: "none",
        border: type === 1 ? "1px solid #ED6262" : "none", // Custom border color for type 1
        bgcolor: type === 1 ? "#2A3236" : "#ED6262", // Custom button color based on type
        color: type === 1 ? "#ED6262" : "#CFCFD0", // Customize text color based on type
        "&:hover": {
          bgcolor: type === 1 ? blueGrey[600] : blueGrey[700], // Button hover color based on type
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;