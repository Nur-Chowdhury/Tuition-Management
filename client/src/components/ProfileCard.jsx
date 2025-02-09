import React from 'react';
import profile from "../assets/userprofile.png";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PiQuestionMarkBold } from "react-icons/pi";
import { MdSupportAgent, MdLogout } from "react-icons/md";
import { logout } from '../redux/actions/authActions';


export default function ProfileCard() {
    const { currentUser } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout(navigate('/')));
    }



    return (
        <div className='w-full flex flex-col items-center shadow-sm rounded-xl py-4 bg-gray-200 dark:bg-gray-900'>
            <div className="w-full flex flex-col items-center gap-2 border-b pb-5 border-green-500">
                <img
                    src={currentUser?.profile ?? profile}
                    alt={currentUser?.userName ?? "User Profile"}
                    className='w-16 h-16 object-cover rounded-full border-2 border-green-500'
                />
                <div className="flex flex-col items-center">
                    <p className='text-lg font-medium dark:text-white m-0 p-0'>
                        {currentUser?.name}
                    </p>
                    <span className='text-sm opacity-70 mt-0 pt-0'>
                        {currentUser?.userType}
                    </span>
                    <Link to={`/profile/${currentUser._id}`} className="w-full">
                        <div className='my-2 p-2 px-6 w-full bg-blue-600 hover:bg-blue-700 transition-all duration-500 transform hover:scale-105 
                        rounded-lg flex justify-center text-white text-lg font-semibold'>
                            My Profile
                        </div>
                    </Link>
                </div>
            </div>
            <div className=' w-full flex flex-col gap-0'>
                <div className=' flex gap-2 px-6 py-4 border-b border-green-500 w-full
                hover:bg-green-500 hover:gap-4 transition-all duration-500 cursor-pointer'>
                    <PiQuestionMarkBold className='text-2xl '/>
                    <p className='text-lg font-semibold dark:text-white'>About Us</p>
                </div>
                <div className=' flex gap-2 px-6 py-4 border-b border-green-500 w-full
                hover:bg-green-500 hover:gap-4 transition-all duration-500 cursor-pointer'>
                    <MdSupportAgent className='text-2xl '/>
                    <p className='text-lg font-semibold dark:text-white'>Support</p>
                </div>
            </div>
            <div className='w-full py-2 mt-2 flex items-center justify-center'>
                <div className='bg-red-600 hover:bg-red-700 transition-all duration-500 transform hover:scale-105 
                    rounded-lg py-2 px-6 text-white text-lg font-semibold flex justify-center cursor-pointer'
                    onClick={handleLogout}
                >
                    <MdLogout className='text-2xl'/>
                    <p className='ml-2'>Logout</p>
                </div>
            </div>
        </div>
    );
}
