import React, { useEffect, useState } from 'react'
//import {FaMoon, FaSun} from 'react-icons/fa';
import {FaMoon, FaSun} from 'react-icons/fa'

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <div className=' w-[70px]'>
            <button onClick={toggleTheme} className=" w-full flex justify-between px-2 py-2 my-1 rounded-full font-bold text-2xl bg-white dark:bg-gray-950">
                <span
                    className={`transition-opacity duration-500 ease-in-out ${
                        theme === 'light' ? 'opacity-100 ' : 'opacity-50'
                    }`}
                >
                    <FaSun size={20} />
                </span>
                <span
                    className={` transition-opacity duration-500 ease-in-out ${
                        theme === 'light' ? 'opacity-50' : 'opacity-100'
                    }`}
                >
                    <FaMoon size={20} />
                </span>
            </button>
        </div>
    );
}
