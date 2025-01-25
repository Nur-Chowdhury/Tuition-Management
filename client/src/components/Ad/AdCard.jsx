import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import profile from "../../assets/userprofile.png";
import moment from "moment";
import { useSelector } from 'react-redux';
import { BiSolidStar } from "react-icons/bi";
import { adRoute, findUserByIdRoute } from '../../utils/ApiRoutes';
import axios from 'axios';
import { CiStar } from "react-icons/ci";

export default function AdCard({ad}) {
    const [showAll, setShowAll] = useState(0);
    const [postedBy, setpostedBy] = useState(null);
    const {currentUser} = useSelector((state) => state.user);
    
    const id = ad.userId;

    const [pst, setPst] = useState(ad);

    const [interested, setInterested] = useState(pst.interested.length);

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
            console.error('Error toggling like:', error);
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
        <div className='mb-2 bg-gray-200 dark:bg-gray-900 p-4 rounded-xl'>
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
                            className='flex items-center justify-center text-base gap-1 border border-blue-500 px-2 py-1 rounded-lg'
                            onClick={handleInterested}
                        >
                            <BiSolidStar size={30} className=' text-green-600' />
                            <span>Uninterested</span>
                        </button>
                    ) : (
                        <button
                            className='flex items-center justify-center text-base gap-1 border border-blue-500 px-2 py-1 rounded-lg'
                            onClick={handleInterested}
                        >
                            <CiStar size={35} className=' text-green-600 font-medium' />
                            <span>Interested</span>
                        </button>
                )}
            </div>

            {/* all comments */}
            {/* {showComments === pst?._id && (
                <div className='w-full mt-4 border-t border-[#66666645] pt-4 '>
                    <CommentForm id={pst._id} userId={currentUser.studentID}/>
                    { loading ? (
                        <h1>Loading...</h1>
                    ) : comments?.length > 0 ? (
                        comments?.map((comment) => (
                            <CommentCard key={comment?._id} comment = {comment}/>
                        ))
                    ) : (
                        <span className='flex text-sm py-4 text-ascent-2 text-center'>
                            No Comments, be first to comment
                        </span>
                    )}
                </div>
            )} */}
        </div>
    )
}
