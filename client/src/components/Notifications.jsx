import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getNotificationsRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };
        const res = await axios.get(getNotificationsRoute, config);
        const data = res.data;
        setNotifications(data);
      } catch (error) {
        console.log(error);
        toast.error('Error Fetching Notifications!');
      }  
    }
    getNotifications();
  }, [])


    return (
        <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          <div className=" w-full bg-gray-100 dark:bg-gray-900 shadow-sm rounded-lg px-6 py-5">
            <div className=' flex flex-col gap-2'>
              <h1 className=' text-3xl text-center font-extrabold mb-4'>Notifications</h1>
              
              {
                notifications?.length ? (
                  notifications.map((notfication, index) => (
                    <div key={index} className=' flex items-center py-2 gap-2 border-y-2 border-y-black dark:border-y-white cursor-pointer'>
                      <p className=' py-2 text-lg font-bold'>{notfication.message}</p>
                    </div>
                  ))
                ):(
                  <p>No Notification to show!</p>
                )
              }
            </div>
          </div>
        </div>
    )
}
