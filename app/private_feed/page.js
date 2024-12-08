import React from 'react';
import TopMenu from '@/components/ui/topmenu';
import SideMenu from '@/components/ui/sidemenu';

const HomePage = () => {
    return (
        <div className='bg-slate-950 min-h-screen'>
            <TopMenu/>
            <div className='flex'>
                <SideMenu/>
                <div className='container mx-auto p-5'>
                    <h1>Welcome to FitHub</h1>
                    <p className='text-3xl'>PRIVATE FEED</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;