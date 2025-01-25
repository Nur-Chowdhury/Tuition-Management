import React from 'react'
import { useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';
import logo from "../assets/logooo.png";
import { Link } from "react-router-dom";
import profile from "../assets/userprofile.png"

export default function Navbar() {

    const {currentUser} = useSelector((state) => state.user);

    return (
        <header className="bg-gray-200 dark:bg-gray-900 shadow-md py-2">
            <nav className="container mx-auto flex items-center justify-between px-6">
                <Link href="#home">
                    <img src={logo} alt="Logo" className=" h-20 w-20" />
                </Link>

                {/* search option */}

                <div className="flex items-center gap-4">
                    <div>
                        <img
                            src={currentUser?.profile ?? profile}
                            alt={currentUser?.userName}
                            className='w-10 h10 object-cover rounded-full'
                        />
                    </div>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
      );
}
