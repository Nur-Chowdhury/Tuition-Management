import React from 'react'
import { useSelector } from 'react-redux'
import Home from './Home';
import AdFeed from './AdFeed';
import Navbar from '../components/Navbar';

export default function LandingPage() {

    const {loading, currentUser} = useSelector((state) => state.user);

    if(currentUser){
        return (
            <div>
                <Navbar />
                <AdFeed />
            </div>
        )
    }else{
        return (
            <Home />
        )
    }
}
