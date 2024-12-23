"use client";
import React from 'react';
import Layout from '@/components/ui/layout';  // Import the Layout component
import { useRouter } from 'next/navigation';

import PostTrainer from '@/components/ui/post_trainer'; 
import PostNutrition from '@/components/ui/post_nutrition';
import CreateTrainerPost from '@/components/ui/create_post_trainer';  // Import the Post component

const HomePage = () => {

    const router = useRouter();
    return (
        <Layout
        pathname={"/home"}>  {/* Wrap the homepage content inside the Layout */}
            
            <h1>Welcome to FitHub</h1>
            <p>Your one-stop solution for fitness tracking and management.</p>
            <PostTrainer />  {/* The Post component will be rendered inside the layout */}
            <br />
            <PostNutrition />
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <CreateTrainerPost />  {/* The Post component will be rendered inside the layout */}
            </div>
        </Layout>
    );
};

export default HomePage;
