"use client";
import React from 'react';
import Layout from '@/components/ui/layout';  // Import the Layout component

import Post from '@/components/ui/posts';  

const HomePage = () => {
    return (
        <Layout>  {/* Wrap the homepage content inside the Layout */}
            <h1>Welcome to FitHub</h1>
            <p>Your one-stop solution for fitness tracking and management.</p>
            <Post />  {/* The Post component will be rendered inside the layout */}
        </Layout>
    );
};

export default HomePage;
