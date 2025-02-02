"use client";

import React from "react";
import Post from "./post";

export default function Feed() {
    return (
        <>
            <Post
                type="trainer"
                avatarLabel="K"
                title="KyawGyi_Fitness"
                subheader="December 28, 2024"
                image="https://images.everydayhealth.com/images/healthy-living/fitness/everything-you-need-know-about-fitness-1440x810.jpg"
                imageAlt="Fitness"
                mainContent="Beginner guide to weight loss and fitness"
                listItems={["Sit Ups", "Push Ups", "Lunges"]}
                secondaryListItems={["60", "30", "30"]}
                tertiaryListItems={["2", "3", "3"]}
                expandedDescriptions={[
                    "DO NOT forget to rest between each set and stay hydrated.",
                    "These exercises are beginner-friendly and can be done at home. Stay healthy and fit!",
                ]}
            />
            <br />
            <Post
                type="trainer"
                avatarLabel="K"
                title="KyawGyi_Fitness"
                subheader="December 28, 2024"
                image="https://images.everydayhealth.com/images/healthy-living/fitness/everything-you-need-know-about-fitness-1440x810.jpg"
                imageAlt="Fitness"
                mainContent="Beginner guide to weight loss and fitness"
                listItems={["Sit Ups", "Push Ups", "Lunges"]}
                secondaryListItems={["60", "30", "30"]}
                tertiaryListItems={["2", "3", "3"]}
                expandedDescriptions={[
                    "DO NOT forget to rest between each set and stay hydrated.",
                    "These exercises are beginner-friendly and can be done at home. Stay healthy and fit!",
                ]}
            />
            <br />
            <Post
                type="trainer"
                avatarLabel="K"
                title="KyawGyi_Fitness"
                subheader="December 28, 2024"
                image="https://images.everydayhealth.com/images/healthy-living/fitness/everything-you-need-know-about-fitness-1440x810.jpg"
                imageAlt="Fitness"
                mainContent="Beginner guide to weight loss and fitness"
                listItems={["Sit Ups", "Push Ups", "Lunges"]}
                secondaryListItems={["60", "30", "30"]}
                tertiaryListItems={["2", "3", "3"]}
                expandedDescriptions={[
                    "DO NOT forget to rest between each set and stay hydrated.",
                    "These exercises are beginner-friendly and can be done at home. Stay healthy and fit!",
                ]}
            />
            <br />
        </>
    );
}