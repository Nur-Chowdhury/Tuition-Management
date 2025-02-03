import React from 'react'
import {useSelector} from 'react-redux'
import Navbar from '../components/Navbar';
import profile from "../assets/userprofile.png";

import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

export default function ProfilePage() {

    const {currentUser} = useSelector((state) => state.user)

    console.log(currentUser);
    currentUser.rating = 4.1;

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar size={30} key={i} className='text-yellow-500' />);
            } else if (i - rating < 1) {
                stars.push(<FaRegStarHalfStroke size={30} key={i} className='text-yellow-500' />);
            } else {
                stars.push(<FaRegStar size={30} key={i} className='text-yellow-500' />);
            }
        }
        return stars;
    };

    return (
        <div className=''>
            <Navbar />
            <div className=' flex flex-col items-center gap-4 my-4 md:my-8 mx-2 md:mx-12 xl:mx-24'>

                {/* usercard */}
                <div className=' w-full md:w[80%] xl:w-[70%]  bg-gray-200 dark:bg-gray-900 px-4 py-8 rounded-lg flex flex-col 
                justify-center items-center gap-4'>
                    <img
                        src={currentUser.profile ? currentUser.profile : profile}
                        alt='Profile Picture'
                        className=' w-[200px] h-[200px] rounded-full object-cover border-4 border-green-500'
                    />

                    <div className=' text-2xl font-bold'>
                        {currentUser.name}
                    </div>

                    <div className=' px-1 py-[2px] bg-green-500 rounded text-md text-white font-medium'>
                        {currentUser.userType}
                    </div>

                    <div className={`w-full text-center text-lg ${currentUser.educationalInstitution ? '': 'hidden'}`}>
                        Institution: {currentUser.educationalInstitution}
                    </div>
                    <div className={`w-full text-center text-lg ${currentUser.department ? '': 'hidden'}`}>
                        Department: {currentUser.department}
                    </div>

                    <div className={` flex gap-2 ${currentUser.interestedTopics ? '': 'hidden'}`}>
                        <span>Interested Topics: </span>
                        <div className={`flex flex-wrap gap-1 text-center`}>
                            {currentUser.interestedTopics.map((topic, index) => (
                                <div className=' px-2 py-1 bg-blue-500 rounded text-md text-white font-medium' key={index}>
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={` flex gap-2 `}>
                        <span>Rating: </span>
                        {console.log(currentUser.rating)}
                        {(currentUser.rating===undefined || currentUser.rating === 0) ? (
                            <div>Not Rated Yet</div>
                        ):(
                            <div className='flex gap-1 items-center justify-center'>
                                {renderRatingStars(currentUser.rating)}
                                <span className='ml-2 text-lg'>{currentUser.rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                    
                </div>

                <div>
                    <h1 className=' text-2xl font-bold'>Posts</h1>
                    <div>
                        hi
                    </div>
                </div>
            </div>
        </div>
    )
}
