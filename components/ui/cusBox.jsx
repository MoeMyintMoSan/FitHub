import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CustomButton from './profileButtons';


const CusBox = ({ test1, test2, type, obj }) => {
    if (type === 1) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <Typography>
                    {test1}
                </Typography>
                <Typography>
                    {test2}
                </Typography>
            </Box>
        );
    } else if (type === 2) {
        return (
            <Box
                sx={{
                    width: "100%",
                    borderRadius: 2,
                    padding: 2,
                    backgroundColor: "#2C3134",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" // Add shadow effect
                }}
            >
                {obj}
            </Box>
        );
    } else if (type === 3) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    gap: 5
                }}
            >
                <img src={test1} style={{ width: '100px', height: '100px' }} />
                <Box
                    sx={{
                        width: '200px', // Adjust the width as needed
                        height: '2px', // Adjust the height as needed
                        backgroundColor: '#ED6262', // Change the color as needed
                    }}
                />
                <Typography>
                    {test2}
                </Typography>
                <CustomButton type={2} onClick={() => { obj(); console.log("Speciality selected!"); }}>
                    SELECT
                </CustomButton>
            </Box>
        );
    }
}

export default CusBox;