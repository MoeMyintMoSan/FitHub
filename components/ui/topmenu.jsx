"use client";
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TopMenu = () => {
    return (
        <AppBar 
            position="sticky" 
            sx={{
                backgroundColor: "#0E1113", //020617
                zIndex: 1201, 
                borderBottom: "2px solid #51626D" ,
                height: "64px"
            }}
        >
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow:1, color: "#ED6262" }}>
                    FitHub
                </Typography>
                <div>
                    <a href="#" className="text-white pr-10">
                        Profile
                    </a>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default TopMenu;
