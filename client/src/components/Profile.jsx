import React from 'react'
import profile from "../assets/userprofile.png";
import { Link } from 'react-router-dom';


export default function Profile({user}) {

    console.log(user);
    return (
        <div className=' flex flex-col gap-2 items-center min-w-[320px] max-h-[450px] rounded-xl shadow-xl dark:shadow-sm bg-gray-200 dark:bg-gray-900 dark:shadow-white p-4'>
            <div className=' flex items-center justify-center'>
                <img
                    src={user?.profile ? user.profile : profile}
                    alt='Profile Picture'
                    className=' h-[150px] w-[150px] rounded-full border-2 border-green-500 object-cover' 
                />
            </div>
            <div className=' w-full flex flex-col items-center gap-2'>
                <div className=' text-2xl font-semibold'>
                    {user.name}
                </div>
                <div className=' px-1 py-[2px] bg-green-500 rounded text-sm text-white font-medium'>
                    {user.userType}
                </div>
                <div className={`flex flex-wrap gap-1 ${user.interestedTopics ? '': 'hidden'}`}>
                    {user.interestedTopics?.map((topic, index) => (
                        <div className=' px-1 py-[2px] bg-blue-500 rounded text-sm text-white font-medium' key={index}>
                            {topic}
                        </div>
                    ))}
                </div>
                <div className={`w-full text-left text-lg ${user.educationalInstitution ? '': 'hidden'}`}>
                    Institution: {user.educationalInstitution}
                </div>
                <div className={`w-full text-left text-lg ${user.department ? '': 'hidden'}`}>
                    Department: {user.department}
                </div>
                <div>
                    Rating
                </div>
                <Link className=' w-[50%] text-center py-1 bg-blue-700 rounded-md transition-all duration-300 hover:border-2 hover:border-blue-700 hover:bg-transparent hover:text-blue-700 hover:font-medium'>
                    Visit
                </Link>
            </div>
        </div>
    )
}
