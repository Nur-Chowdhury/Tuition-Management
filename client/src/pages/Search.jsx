import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { searchRoute } from '../utils/ApiRoutes';
import Profile from '../components/Profile';
import AdCard from '../components/Ad/AdCard';


export default function Search() {

    const navigate = useNavigate();
    const [urlParams, setUrlParams] = useState({});
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'tutor',
        subType: 'name',
        sort: 'createdAt',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [range, setRange] = useState(10);
    const [lt, setLt] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setUrlParams({
            searchTerm: params.get('searchTerm') || '',
            type: params.get('type') || 'tutor',
            subType: params.get('subType') || 'name',
            sort: params.get('sort') || 'createdAt',
            order: params.get('order') || 'desc',
        });
    }, [location.search]);

    useEffect(() => {
        setSidebardata(urlParams);
        setLt(urlParams.type === 'post');
    }, [urlParams]);

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = new URLSearchParams(sidebardata).toString();
            const res = await fetch(`${searchRoute}?${searchQuery}`);
            const data = await res.json();
            setShowMore(data.length > range);
            setListings(data);
            setLoading(false);
        };

        if (Object.keys(sidebardata).length > 0) {
            fetchListings();
        }
    }, [sidebardata]);

    const handleChange = (e) => {
        if (
            e.target.id === 'tutor' ||
            e.target.id === 'post' ||
            e.target.id === 'guardian'
        ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }

        if (
            e.target.id === 'name' ||
            e.target.id === 'instituition' ||
            e.target.id === 'topic'
        ) {
            setSidebardata({ ...sidebardata, subType: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('subType', sidebardata.subType);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        setRange(range + 10);
        if (listings.length < range) {
            setShowMore(false);
        }
    }
    
    return (
        <div>
            <Navbar />
            <div className='flex flex-col lg:flex-row'>
                {/* left */}
                <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen w-full lg:w-[30%]'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                        <div className='flex items-center gap-2'>
                            <label className='whitespace-nowrap font-semibold'>
                                Search Term:
                            </label>
                            <input
                                type='text'
                                id='searchTerm'
                                placeholder='Search...'
                                className='border rounded-lg p-2 w-full text-black'
                                value={sidebardata.searchTerm}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex gap-2 flex-wrap items-center'>
                            <label className='font-semibold'>Type:</label>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='tutor'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'tutor'}
                                />
                                <span>Tutor</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='guardian'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'guardian'}
                                />
                                <span>Guardian</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='post'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'post'}
                                />
                                <span>Posts</span>
                            </div>
                        </div>

                        <div className={`flex gap-2 flex-wrap items-center ${sidebardata.type === 'tutor' ? '':' hidden'}`}>
                            <label className='font-semibold'>Search by:</label>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='name'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.subType === 'name'}
                                />
                                <span>Name</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='instituition'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.subType === 'instituition'}
                                />
                                <span>Institution</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='topic'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.subType === 'topic'}
                                />
                                <span>Topic</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <label className='font-semibold'>Sort:</label>
                            <select
                                onChange={handleChange}
                                defaultValue={'createdAt_desc'}
                                id='sort_order'
                                className='border rounded-lg p-3 text-black'
                            >
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                            <option value='rating' className={`${sidebardata.type === 'tutor' ? '':'hidden'}`} >Rating</option>
                            </select>
                        </div>

                        <button className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:border-2 hover:bg-transparent
                            hover:border-blue-600 hover:text-blue-600 transition duration-500'
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* right */}
                {loading ? (
                    <div className=' flex items-center justify-center text-xl font-semibold'>
                        Loading
                    </div>
                ):(
                    lt ? (
                        <div className=' flex flex-col items-center m-8 gap-8'>
                            <div className=' w-[95%] md:w-[60%]'>
                                {listings.map((item, index) => (
                                    <AdCard key={index} ad={item} />
                                ))}
                            </div>
                        </div>
                    ):(
                        <div className=' flex flex-wrap justify-center m-8 gap-4'>
                            {listings.map((item, index) => (
                                <Profile key={index} user={item} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
