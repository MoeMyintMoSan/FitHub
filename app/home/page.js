import React from 'react';
import TopMenu from '@/components/ui/topmenu';
import SideMenu from '@/components/ui/sidemenu';
import Post from '@/components/ui/posts';

const HomePage = () => {
    return (
        <div className='bg-slate-950 min-h-screen'>
            <TopMenu/>
            <div className='flex'>
                <SideMenu/>
                <div className='container mx-auto p-5'>
                    <h1>Welcome to FitHub</h1>
                    <p>Your one-stop solution for fitness tracking and management.</p>
                    <Post/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;