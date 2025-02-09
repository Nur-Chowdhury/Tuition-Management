import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { adRoute, findUserByIdRoute, getAdRoute } from '../utils/ApiRoutes';
import { Link, useParams } from 'react-router-dom';
import moment from "moment";
import profile from "../assets/userprofile.png";
import { useSelector } from 'react-redux';
import { CiStar } from "react-icons/ci";
import { toast } from 'react-toastify';
import Ad from '../../../server/models/Ad';
import { BiSolidStar } from "react-icons/bi";



export default function SinglePost() {

    const {id} = useParams();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(false);
    const [postedBy, setpostedBy] = useState(null);
    const [interested, setInterested] = useState(ad?.interested?.length | 0);
    const [showAll, setShowAll] = useState(0);
    const [interestedUsers, setInterestedUsers] = useState([]);

    const [booked, setBooked] = useState(ad?.booked | null);

    const {currentUser} = useSelector((state) => state.user);
    useEffect(() => {
        const fetchAd = async () => {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            const res = await axios.get(`${getAdRoute}/${id}`, config); 
            const data = res.data;
            setAd(data);
            setLoading(false); 
            const res2 = await axios.get(`${findUserByIdRoute}/${data.userId}`, config);
            const data2 = res2.data;
            setpostedBy(data2);
            const interestedUserIds = data.interested;
            const userRequests = interestedUserIds.map((userId) => 
                axios.get(`${findUserByIdRoute}/${userId}`, config)
            );
            const userResponses = await Promise.all(userRequests);
            const interestedUserData = userResponses.map((response) => response.data);
            setInterestedUsers(interestedUserData);
            setInterested(interestedUserData.length);
            setBooked(data.booked);
        };
        fetchAd();
    }, [id]);

    const handleInterested = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            const response = await axios.post(`${adRoute}/${ad._id}/interest`, {}, config);
            const add = response.data;
            setAd(add);
            setInterested(add.interested.length);    
        } catch (error) {
            toast.error('Error toggling like:', error);
        }
    }

    const handleSelect = async (e, tutorId) => {
        e.stopPropagation();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            const res = await axios.post(`${adRoute}/${ad._id}/book`, { tutorId }, config);
            const data  =res.data;
            setBooked(data.booked);
            toast.success('Tutor Selected Successfully!');
        } catch (error) {            
            toast.error("Error Selecting Tutor: ", error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className=' mt-20 mb-8 flex justify-center'>
                <div className=' w-[90%] md:w-[70%] xl:w-[50%] bg-gray-200 dark:bg-gray-900 shadow-xl rounded-xl p-4'>
                    <div className='flex gap-3 items-center mb-2'>
                        <Link to={"/profile/"+ ad?.userId}>
                            <img
                                src={postedBy?.profile ?? profile}
                                alt='profile'
                                className='w-14 h-14 object-cover rounded-full'
                            /> 
                        </Link>
                        <div className='w-full flex justify-between'>
                            <div className=''>
                                <Link to={"/profile/" + ad?.userId}>
                                    <p className='font-medium text-lg'>
                                        {postedBy?.name}
                                    </p> 
                                </Link>
                            </div>

                            <span className='text-ascent-2'>
                                {moment(ad?.createdAt ?? "2023-05-25").fromNow()}
                            </span>
                        </div>
                    </div>

                    <div className=' flex flex-wrap gap-2 my-2'>
                        {ad?.topics && (
                            ad.topics.map((topic, index) => {
                                return <div className=' px-1 py-[2px] bg-blue-500 rounded text-sm text-white font-medium' key={index}>
                                    {topic}
                                </div>
                            })
                        )}
                    </div>

                    <div>
                        <p className='text-ascent-2'>
                            {showAll === ad?._id
                            ? ad?.content
                            : ad?.content.slice(0, 300)}

                        {ad?.content?.length > 301 &&
                            (showAll === ad?._id ? (
                                <span
                                    className='text-blue ml-2 font-medium cursor-pointer'
                                    onClick={() => setShowAll(0)}
                                >
                                    Show Less
                                </span>
                            ) : (
                                <span
                                    className='text-blue ml-2 font-medium cursor-pointer'
                                    onClick={() => setShowAll(ad?._id)}
                                >
                                    Show More
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* interested */}
                    <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
                        text-base border-y border-black dark:border-white'
                    >
                        <p className='flex gap-2 items-center text-base'>
                            {interested} Interested
                        </p>
                        
                        {ad?.interested?.includes(currentUser?._id) ? (
                                <button
                                    className={`flex items-center justify-center text-base gap-1 border border-blue-500 px-2 py-1 rounded-lg ${booked ? " cursor-not-allowed opacity-65":""}`}
                                    disabled = {booked !== undefined}
                                    onClick={handleInterested}
                                >
                                    <BiSolidStar size={30} className=' text-green-600' />
                                    <span>Uninterested</span>
                                </button>
                            ) : (
                                <button
                                    className={`flex items-center justify-center text-base gap-1 border border-blue-500 px-2 py-1 rounded-lg ${currentUser._id === ad?.userId ? ' cursor-not-allowed opacity-40': ''}`}
                                    onClick={handleInterested}
                                    disabled = {currentUser._id === ad?.userId}
                                >
                                    <CiStar size={35} className=' text-green-600 font-medium' />
                                    <span>Interested</span>
                                </button>
                        )}
                    </div>

                    <div className=' my-2 flex flex-col items-center gap-4'>
                        <h1 className=' text-xl font-semibold'>Interested List</h1>
                        {
                            interested ? (<div className=' w-full'>
                                {interestedUsers.map((user, index) => (
                                    <div key={index} to={"/profile/"+ user._id} 
                                        className=' flex justify-between px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-950 cursor-pointer'
                                        onClick={() => window.location.href = `/profile/${user._id}`}
                                    >
                                        <div className=' flex items-center'>
                                            <div className=' flex gap-2'>
                                                <img
                                                    src={user.profile ?? profile}
                                                    alt='profile'
                                                    className='w-10 h-10 object-cover rounded-full'
                                                />
                                                <div>{user.name}</div>
                                            </div>
                                        </div>
                                        { booked === user._id && (<div className={` flex flex-col items-center justify-center ${currentUser._id !== ad.userId ? "hidden":""}`}>
                                                <span>Email: {user.email}</span>
                                                <span>Phone: {user.phone ? user.phone: 'N/A'}</span>
                                            </div>)
                                        }
                                        <div className={` flex items-center ${currentUser._id === ad.userId ? '':' hidden'}`}>
                                            <button className={` py-2 px-4 bg-blue-500 hover:bg-green-500 rounded-lg text-lg font-medium text-white
                                                ${booked ? " cursor-not-allowed": ""} ${booked === user._id ? "bg-green-500": ""}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelect(e, user._id);
                                                }}
                                                disabled = {booked}
                                            >
                                                {booked === user._id ? "Selected" : "Select"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>):(<div>
                                No one is Interested at this moment!
                            </div>)
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
