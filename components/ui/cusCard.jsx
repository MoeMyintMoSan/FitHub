"use client";

import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Feed from "./feed";

export default function CusCard({ name, email, onClick }) {
    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                height: 110,
                width: 400,
                borderRadius: 2,
                padding: 2,
                backgroundColor: "#ED6262",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                cursor: "pointer"
            }}
            onClick={onClick}
            >
            <Avatar
                sx={{
                    marginLeft: "15px",
                    marginRight: "15px",
                    width: 80,
                    height: 80,
                    backgroundColor: "#2C3134",
                    fontSize: 40
                }}
            >
                {name.charAt(0)}
            </Avatar>
            <CardContent>
                <Typography fontSize="1.5rem" >{name}</Typography>
                <Typography fontSize="1rem">{email}</Typography>
            </CardContent>
        </Card>
    );
}