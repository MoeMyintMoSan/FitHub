import React from 'react';

const TopMenu = () => {
    return (
        <nav className="bg-slate-900 p-4">
            <ul className="flex justify-between items-center min-h-7">

                <li><a href="#" className="text-red-400 text-3xl font-bold">Fithub</a></li>

                <div className="flex space-x-4">
                    <li><a href="#" className="text-white">About</a></li>
                    <li><a href="#" className="text-white">Services</a></li>
                    <li><a href="#" className="text-white">Contact</a></li>
                </div>
               
            </ul>
        </nav>
    );
};

export default TopMenu;
