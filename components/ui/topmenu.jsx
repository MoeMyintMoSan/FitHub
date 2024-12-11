"use client";
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TopMenu = () => {
    return (
        <AppBar 
            position="sticky" 
            sx={{
                backgroundColor: "#020617", 
                zIndex: 1201, 
                borderBottom: "2px solid #51626D" 
            }}
        >
            <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1, color: "#F3F4F6" }}>
                    Fithub
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
