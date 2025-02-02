"use client";

import React from "react";
import Post from "./post";

export default function Feed() {
    return (
        <>
            <Post
                type="trainer"
                avatarLabel="M"
                title="MaxFitness"
                subheader="December 28, 2024"
                image="https://www.skechers.com.tr/blog/wp-content/uploads/2023/03/fitnes-770x513.jpg"
                imageAlt="Fitness"
                mainContent="Training Level Up!"
                listItems={["Sit Ups", "Push Ups", "Lunges"]}
                secondaryListItems={["60", "30", "30"]}
                tertiaryListItems={["2", "3", "3"]}
                expandedDescriptions={[
                    "Dear Lucas, you’ve progressed a lot in the past few days! I will try to level up the exercises for you this time and we will concentrate more on the legs. ",
                    "Remember to keep your back straight and your core engaged during the exercises. Keep up the good work!",
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