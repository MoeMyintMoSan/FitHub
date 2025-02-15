import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const DetailBox = ({ dataTitle, dataValue, disable, type, onChange }) => {

    return (
        <Box>
            <Typography
                variant="caption"
                sx={{ fontWeight: "bold", color: "#849298" }}
            >
                {dataTitle}
            </Typography>
            <TextField
                defaultValue={dataValue}
                variant="outlined"
                fullWidth
                multiline={type === "yes"}
                disabled={disable}
                sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                        fontSize: "1.25rem", // Change font size of the input text
                        padding: "10px", // Adjust padding inside the text field
                        color: "#FFFFFF" // Change text color to white when disabled
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#FFFFFF",
                    },
                    backgroundColor: "#2A3236",
                }}
                onChange={(e) => onChange(e.target.value)}
            />
        </Box>
    );
}

export default DetailBox;