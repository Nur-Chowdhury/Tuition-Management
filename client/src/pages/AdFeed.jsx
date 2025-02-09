import React from 'react'
import { useSelector } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import Ads from '../components/Ad/Ads';
import Notifications from '../components/Notifications';

export default function AdFeed() {
    const {currentUser} = useSelector((state) => state.user);


  return (  
    <div className='w-full px-0 lg:px-10 2xl:px-40 lg:rounded-lg h-screen overflow-hidden'>
      <div className=' w-full flex gap-2 lg:gap-4 pt-5 h-full'>
        {/*left*/}
        <div className=' hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto rounded-lg'> 
            <ProfileCard user={currentUser} />
        </div> 

        {/*center */}
        <div className="flex-1 h-full px-4 flex flex-col gap-6  rounded-lg">
          <Ads />
        </div>

        {/* right */}

        <Notifications />
      </div>
    </div>
  )
}
