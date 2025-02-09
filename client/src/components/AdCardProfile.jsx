import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import profile from "../assets/userprofile.png";
import moment from "moment";
import { useSelector } from 'react-redux';
import { BiSolidStar } from "react-icons/bi";
import { adRoute, findUserByIdRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import { CiStar } from "react-icons/ci";
import { toast } from 'react-toastify';

export default function AdCardProfile({ad}) {
    const [showAll, setShowAll] = useState(0);
    const [postedBy, setpostedBy] = useState(null);
    const {currentUser} = useSelector((state) => state.user);
    
    const id = ad.userId;

    const [pst, setPst] = useState(ad);

    const [interested, setInterested] = useState(pst.interested?.length | 0);

    const handleInterested = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            const response = await axios.post(`${adRoute}/${pst._id}/interest`, {}, config);
            const ps = response.data;
            setPst(ps);
            setInterested(ps.interested.length);    
        } catch (error) {
            toast.error('Error toggling like:', error);
        }
    }

    useEffect(() => { 
        if(!postedBy){
            const fetchUser = async (id) => {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                };
                const res = await axios.get(`${findUserByIdRoute}/${id}`, config);
                const data = res.data;
                setpostedBy(data);
            };
            fetchUser(id);
        }
    }, [id]);

    return (
        <div className=' w-[320px] md:w-[500px] xl:w-[600px] mb-8 bg-gray-200 dark:bg-gray-900 p-4 rounded-xl cursor-pointer'
            onClick={() => window.location.href = `/post/${pst._id}`}
        >
            <div className='flex gap-3 items-center mb-2'>
                <Link to={"/profile/"+ pst?.userId}>
                    <img
                        src={postedBy?.profile ?? profile}
                        alt='profile'
                        className='w-14 h-14 object-cover rounded-full'
                    /> 
                </Link>
                <div className='w-full flex justify-between'>
                    <div className=''>
                        <Link to={"/profile/" + pst?.userId}>
                            <p className='font-medium text-lg'>
                                {postedBy?.name}
                            </p> 
                        </Link>
                    </div>

                    <span className='text-ascent-2'>
                        {moment(pst?.createdAt ?? "2023-05-25").fromNow()}
                    </span>
                </div>
            </div>

            {/* post body */}

            <div className=' flex flex-wrap gap-2 my-2'>
                {pst?.topics && (
                    pst.topics.map((topic, index) => {
                        return <div className=' px-1 py-[2px] bg-blue-500 rounded text-sm text-white font-medium' key={index}>
                            {topic}
                        </div>
                    })
                )}
            </div>

            <div>
                <p className='text-ascent-2'>
                    {showAll === pst?._id
                    ? pst?.content
                    : pst?.content.slice(0, 300)}

                {pst?.content?.length > 301 &&
                    (showAll === pst?._id ? (
                        <span
                            className='text-blue ml-2 font-medium cursor-pointer'
                            onClick={() => setShowAll(0)}
                        >
                            Show Less
                        </span>
                    ) : (
                        <span
                            className='text-blue ml-2 font-medium cursor-pointer'
                            onClick={() => setShowAll(pst?._id)}
                        >
                            Show More
                        </span>
                    ))}
                </p>
            </div>

            {/* like comments */}
            <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
            text-base border-t border-black dark:border-white'>
                <p className='flex gap-2 items-center text-base'>
                    {interested} Interested
                </p>
                
                
                {pst?.interested?.includes(currentUser?._id) ? (
                        <button
                            className={`flex items-center justify-center text-base gap-1 border border-blue-500 px-2 py-1 rounded-lg ${pst.booked ? ' cursor-not-allowed opacity-40': ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleInterested();
                            }}
                            disabled = {pst.booked}
                        >
                            <BiSolidStar size={30} className=' text-green-600' />
                            <span>Uninterested</span>
                        </button>
                    ) : (
                        <button
                            className={`flex items-center justify-center text-base gap-1 border border-blue-500 px-2 py-1 rounded-lg ${(currentUser._id === pst?.userId || pst.booked) ? ' cursor-not-allowed opacity-40': ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleInterested();
                            }}
                            disabled = {currentUser._id === pst?.userId || pst.booked}
                        >
                            <CiStar size={35} className=' text-green-600 font-medium' />
                            <span>Interested</span>
                        </button>
                )}
            </div>
        </div>
    )
}
