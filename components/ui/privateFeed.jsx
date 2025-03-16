"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PeopleIcon from '@mui/icons-material/People';
import { CssBaseline, GlobalStyles } from "@mui/material";

import Feed from "./feed";
import CusCard from "./cusCard";
import { Empty } from "antd";

export default function PrivateFeed() {

    const initialFields = [
        { id: 1, name: "John", email: "john123@email.com" },
        { id: 2, name: "Doe", email: "doe321@gmail.com" },
        { id: 3, name: "Jane", email: "jane111@gmail.com" },
        { id: 4, name: "Alice", email: "alice456@gmail.com" },
        { id: 5, name: "Bob", email: "bob789@gmail.com" },
        { id: 6, name: "Charlie", email: "charlie101@gmail.com" },
        { id: 7, name: "Eve", email: "eve202@gmail.com" },
        { id: 8, name: "Frank", email: "frank303@gmail.com" },
    ];
    const [fields, setFields] = React.useState(initialFields);
    const totalCards = 10;
    const blankCards = totalCards - fields.length;

    const [userType, setUsertype] = React.useState(1);
    const [activeTab, setActiveTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleCardClick = (name, email) => {
        console.log(`Card clicked: ${name}, ${email}`);
        setUsertype(2);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <GlobalStyles styles={{ "html, body": { margin: 0, padding: 0, width: "100%", height: "100%" } }} />
            {userType === 0 && (
                <Box>
                    <Tabs
                        orientation="vertical"
                        sx={{ position: "sticky", top: "64px", zIndex: 1201, marginBottom: "25px", backgroundColor: "#0E1113" }}
                        value={activeTab}
                        onChange={handleTabChange}
                        TabIndicatorProps={{ style: { backgroundColor: "#FF9999" } }}
                    >
                        <Tab
                            label="Trainer"
                            sx={{
                                color: activeTab === 0 ? "#FF9999" : "#FFFFFF",
                                "&.Mui-selected": { color: "#FF9999" },
                                width: "100%"
                            }}
                        />
                        <Tab
                            label="Nutritionist"
                            sx={{
                                color: activeTab === 1 ? "#FF9999" : "#FFFFFF",
                                "&.Mui-selected": { color: "#FF9999" },
                                width: "100%"
                            }}
                        />
                    </Tabs>
                    <Box sx={{ textAlign: "center", color: "#FFFFFF" }}>
                        {activeTab === 0 && <Feed />}
                        {activeTab === 1 && (
                            <Box sx={{ padding: 2 }}>
                                <PeopleIcon sx={{ color: "#FFFFFF", fontSize: 40 }} />
                                <Typography sx={{ fontSize: "1.5rem", color: "#FFFFFF" }}>
                                You haven&apos;t registered a nutritionist yet! Please register a nutritionist first!
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
            {userType === 1 && fields.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, padding: 2 }}>
                    {fields.map((field) => (
                        <CusCard key={field.id} name={field.name} email={field.email} onClick={() => handleCardClick(field.name, field.email)} />
                    ))}
                    {Array.from({ length: blankCards }).map((_, index) => (
                        <CusCard key={`blank-${index}`} name={"Empty"} email={"No Data"} />
                    ))}
                </Box>
            )}
            {userType === 1 && blankCards === 10 && (
                <Box sx={{ display: "flex", justifyContent: "center", margin: 2, padding: 3, textAlign: "center" }}>
                    <Box sx={{ padding: 2 }}>
                        <PeopleIcon sx={{ color: "#ED6262", fontSize: 40 }} />
                        <Typography sx={{ fontSize: "1.5rem", color: "#ED6262" }}>
                            No one has registered you yet! Please wait for an athlete to register you first!
                        </Typography>
                    </Box>
                </Box>
            )}
            {userType === 2 && <Feed />}
        </React.Fragment>
    );
}
