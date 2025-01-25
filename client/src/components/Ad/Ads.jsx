import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getAdsRoute } from '../../utils/ApiRoutes';
import AdCreate from './AdCreate';
import AdCard from './AdCard';


export default function Ads() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
          withCredentials: true,
      };
      const res = await axios.get( getAdsRoute, config); 
      const data = res.data;
      setAds(data); 
    };
    fetchAds();
    setLoading(false);
  }, []);

  return ( 
    <div className=' h-full overflow-y-auto scrollbar-hide'>
      {loading ? (
            <h1>Loading</h1>
        ) : (
          <div>
            <div className=' mb-6'><AdCreate /></div>
            {ads?.map((ad, index) => (
                    <AdCard key={ad?._id} ad={ad} />                
                )
            )} 
          </div>
        )
      }
      <div className='flex w-full items-center justify-center'>
        <p className='text-lg text-ascent-2'>No More Post Available</p>
      </div>
    </div>
  )
}
