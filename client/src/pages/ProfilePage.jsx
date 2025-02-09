import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import profile from "../assets/userprofile.png";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";
import axios from 'axios';
import { findUserByIdRoute, getUserAdsRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import AdCardProfile from '../components/AdCardProfile';

export default function ProfilePage() {

    const { id } = useParams();

    const [ads, setAds] = useState([]);

    const [user, setUser] = useState({});

    const ratings = [4.5, 4.1, 3.9, 4.7, 4.4, 3.7];


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

    useEffect(() => {
        const fetchUser = async (id) => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                };
                const res = await axios.get( `${findUserByIdRoute}/${id}`, config);
                const data = res.data;
                data.rating = ratings[Math.floor(Math.random() * ratings.length)];
                setUser(data);
            } catch (error) {
                toast.error(error);
            }
        }

        fetchUser(id);

        const fetchAdsById = async (id) => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                };
                const res = await axios.get( `${getUserAdsRoute}/${id}`, config);
                const data = res.data;
                setAds(data);
            } catch (error) {
                toast.error(error);
            } 
        }
        fetchAdsById(id);
    },[id])

    return (
        <div className=''>
            <Navbar />
            <div className=' flex flex-col items-center gap-4 my-4 md:my-8 mx-2 md:mx-12 xl:mx-24'>

                {/* usercard */}
                <div className=' w-full md:w[80%] xl:w-[70%]  bg-gray-200 dark:bg-gray-900 px-4 py-8 rounded-lg flex flex-col 
                justify-center items-center gap-4'>
                    <img
                        src={user?.profile ? user?.profile : profile}
                        alt='Profile Picture'
                        className=' w-[200px] h-[200px] rounded-full object-cover border-4 border-green-500'
                    />

                    <div className=' text-2xl font-bold'>
                        {user?.name}
                    </div>

                    <div className=' px-1 py-[2px] bg-green-500 rounded text-md text-white font-medium'>
                        {user?.userType}
                    </div>

                    <div className={`w-full text-center text-lg ${user?.educationalInstitution ? '': 'hidden'}`}>
                        Institution: {user?.educationalInstitution}
                    </div>
                    <div className={`w-full text-center text-lg ${user?.department ? '': 'hidden'}`}>
                        Department: {user?.department}
                    </div>

                    <div className={` flex gap-2 ${user.interestedTopics ? '': 'hidden'}`}>
                        <span>Interested Topics: </span>
                        <div className={`flex flex-wrap gap-1 text-center`}>
                            {user?.interestedTopics?.map((topic, index) => (
                                <div className=' px-2 py-1 bg-blue-500 rounded text-md text-white font-medium' key={index}>
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={` flex gap-2 `}>
                        <span>Rating: </span>
                        <div className='flex gap-1 items-center justify-center'>
                            {renderRatingStars(user?.rating)}
                            <span className='ml-2 text-lg'>{user?.rating?.toFixed(1)}</span>
                        </div>
                    </div>
                    
                </div>

                <div>
                    <h1 className=' text-2xl font-bold mb-8'>Posts</h1>
                    <div>
                        {
                            ads?.length === 0 ? (
                                <div>No Posts to Show</div>
                            ) : (
                                <div>
                                    {ads?.map((ad, index) => (
                                        <AdCardProfile key={index} ad={ad} />
                                    ))}
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
