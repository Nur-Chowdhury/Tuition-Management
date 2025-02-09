import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';
import logo from "../assets/logooo.png";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/userprofile.png"
import { FaSearch } from 'react-icons/fa';
import { logout } from '../redux/actions/authActions';

export default function Navbar() {

    const {currentUser} = useSelector((state) => state.user);

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    const handleLogout = () => {
        dispatch(logout(navigate('/')));
    }

    return (
        <header className="bg-gray-200 dark:bg-gray-900 shadow-md py-2">
            <nav className="container mx-auto flex items-center justify-between px-6">
                <Link to="/">
                    <img src={logo} alt="Logo" className=" h-20 w-20" />
                </Link>

                {/* search option */}
                <form
                    onSubmit={handleSubmit}
                    className='bg-slate-100 p-3 rounded-lg flex items-center'
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>

                <div className="flex items-center gap-4">
                    <div className="relative text-left">
                        <div onClick={toggleDropdown} className="cursor-pointer flex items-center">
                            <img
                                src={currentUser?.profile ? currentUser.profile : profile}
                                alt="User Profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </div>

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 text-center font-semibold">
                                <div className="py-1">
                                    <div className="px-4 py-2">
                                        <span className="block text-lg">{currentUser?.name}</span>
                                    </div>
                                    <Link to={`/profile/${currentUser?._id}`} className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-center"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                        </div>

                    <ThemeToggle />
                </div>
            </nav>
        </header>
      );
}
