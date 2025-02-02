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
            {userType === 0 && (
                <Box>
                    <Tabs
                        sx={{
                            position: "sticky",
                            top: "64px",
                            zIndex: 1201,
                            marginBottom: "25px",
                            backgroundColor: "#0E1113"
                        }}
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        TabIndicatorProps={{ style: { backgroundColor: "#FF9999" } }}
                    >
                        <Tab
                            label="Trainer"
                            sx={{
                                color: activeTab === 0 ? "#FF9999" : "#FFFFFF", // Change color when selected
                                "&.Mui-selected": {
                                    color: "#FF9999", // Color when selected
                                },
                            }}
                        />
                        <Tab
                            label="Nutritionist"
                            sx={{
                                color: activeTab === 1 ? "#FF9999" : "#FFFFFF", // Change color when selected
                                "&.Mui-selected": {
                                    color: "#FF9999", // Color when selected
                                },
                            }}
                        />
                    </Tabs>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            color: "#FFFFFF"
                        }}
                    >
                        {activeTab === 0 && (
                            <Feed />
                        )}
                        {activeTab === 1 && (
                            <Box
                                sx={{
                                    backgroundColor: "#222F31", // Light red background color to indicate a warning
                                    padding: 2,
                                    borderRadius: 1,
                                    textAlign: "center",
                                }}
                            >
                                <br />
                                <PeopleIcon sx={{ color: "#FFFFFF", fontSize: 40 }} />
                                <br />
                                <Typography
                                    sx={{
                                        whiteSpace: "pre-line",
                                        fontSize: "1.5rem",
                                        color: "#FFFFFF", // Dark red text color
                                    }}
                                >
                                    You haven't registered a nutritionist yet !{"\n"}
                                    Please register a nutritionist first !
                                </Typography>
                                <br />
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
            {userType === 1 && fields.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "space-evenly",
                        gap: 2,
                        padding: 2,
                        borderRadius: 2,
                        backgroundColor: "#2C3134"
                    }}
                >
                    {/* Left Fields */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        gap: 2,
                        height: 600
                    }}>
                        {fields.slice(0, 5).map((field) => (
                            <CusCard key={field.id} name={field.name} email={field.email}
                                onClick={() => handleCardClick(field.name, field.email)}></CusCard>
                        ))}
                        {blankCards > 5 && Array.from({ length: blankCards - 5 }).map((_, index) => (
                            <CusCard key={`blank-right-${index}`} name={"Empty"} email={"No Data"}></CusCard>
                        ))}
                    </Box>

                    {/* Right Column */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        gap: 2,
                        height: 600
                    }}>
                        {fields.slice(5).map((field) => (
                            <CusCard key={field.id} name={field.name} email={field.email}
                                onClick={() => handleCardClick(field.name, field.email)}></CusCard>
                        ))}
                        {blankCards > 0 && Array.from({ length: Math.min(blankCards, 5) }).map((_, index) => (
                            <CusCard key={`blank-right-${index}`} name={"Empty"} email={"No Data"}></CusCard>
                        ))}
                    </Box>
                </Box>
            )}
            {userType === 1 && blankCards === 10 && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: "#ED6262", // Light red background color to indicate a warning
                        margin: 2,
                        borderRadius: 2,
                        height: 600
                    }} >
                    <Box
                        sx={{
                            backgroundColor: "#2C3134", // Light red background color to indicate a warning
                            padding: 2,
                            borderRadius: 1,
                            textAlign: "center",
                            width: "60%",
                        }}
                    >
                        <br />
                        <PeopleIcon sx={{ color: "#ED6262", fontSize: 40 }} />
                        <br />
                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                                fontSize: "1.5rem",
                                color: "#ED6262", // Dark red text color
                            }}
                        >
                            No one has registered you yet !{"\n"}
                            Please wait for an athlete to register you first !
                        </Typography>
                        <br />
                    </Box>
                </Box>
            )}
            {userType === 2 && (
                <Feed />
            )}
        </React.Fragment>
    );
}