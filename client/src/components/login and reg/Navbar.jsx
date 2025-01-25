import React from 'react'
import ThemeToggle from '../ThemeToggle'
import logo from "../../assets/logooo.png";
export default function Navbar() {
    return (
        <header className="bg-gray-200 dark:bg-gray-900 shadow-md p-2 border-b-[1px] border-b-gray-900 dark:border-b-gray-200 fixed top-0 left-0 w-full z-10">
            <div className="flex justify-between items-center">
                <a href="/" className="logo">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className=" h-20 w-20" 
                    />
                </a>
                <div className=' flex gap-2 text-violet-950 dark:text-violet-800'>
                    <h1 className="text-4xl font-bold text-center">
                        EduBridge: 
                    </h1>
                    <h2 className="text-xl font-semibold text-center pt-2">
                        Bridging the Gap Between Guardians and Teachers
                    </h2>
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}
