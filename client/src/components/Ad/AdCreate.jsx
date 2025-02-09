import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import profile from "../../assets/userprofile.png"
import { toast } from 'react-toastify';
import axios from 'axios';
import { createAdRoute } from '../../utils/ApiRoutes';
import { useNavigate } from "react-router-dom";


const initialTopics = [
    { subName: 'Mathematics', isSelected: false },
    { subName: 'English', isSelected: false },
    { subName: 'Bangla', isSelected: false },
    { subName: 'Physics', isSelected: false },
    { subName: 'Chemistry', isSelected: false },
    { subName: 'Biology', isSelected: false },
    { subName: 'Economics', isSelected: false },
    { subName: 'Social Science', isSelected: false },
];

export default function AdCreate() {
    const {currentUser} = useSelector((state) => state.user);
    const [publishError, setPublishError] = useState(null);
    const [formData, setFormData] = useState({ selectedTopics: [], content: '' });    
    const [topics, setTopics] = useState(initialTopics);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.selectedTopics.length){
            toast.error('Please select at least one topic!');
            return;
        }
        if(!formData.content){
            toast.error('Please Describe Your Requirements!');
            return;
        }
        try { 
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            const {data} = await axios.post( createAdRoute, {
                    content: formData.content, 
                    topics: formData.selectedTopics
                }   , config
            );
            if(data){
                toast.success('Ad created successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleTopicSelect = (topic) => {
        if (formData.selectedTopics.length > 5) {
          toast.error('You can select up to 5 topics only.');
        }
        setFormData((prev) => ({
          ...prev,
          selectedTopics: [...prev.selectedTopics, topic.subName],
        }));
        setTopics((prev) => prev.filter((t) => t.subName !== topic.subName));
    };

    const handleTopicRemove = (topic) => {
        setFormData((prev) => ({
          ...prev,
          selectedTopics: prev.selectedTopics.filter(
            (t) => t !== topic
          ),
        }));
        const tp = initialTopics.find((t) => t.subName === topic);
        setTopics((prev) => [...prev, tp]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='bg-gray-200 dark:bg-gray-900 px-4 rounded-lg border-green-500'>
                <div className='w-full flex items-center gap-2 py-4 border-b'>
                    <img
                        src={currentUser?.profile ?? profile}
                        alt='User Image'
                        className=' w-14 h-14 rounded-full object-cover border border-green-500' 
                    />
                    <div className='w-full flex flex-col mt-2'>
                        <textarea
                            type='text'
                            placeholder="Write your requirements here (Please describe in detail)"
                            required
                            id='content'
                            className='w-full h-32 rounded-xl object-cover bg-secondary border border-green-500 
                                    outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] 
                                    resize-none overflow-hidden'
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                        ></textarea>
                    </div>
                </div>

                {/* Selected Topics and Dropdown */}
                <div className="w-full flex items-center gap-4 my-4 relative">
                    {/* Selected Topics */}
                    <div className="flex flex-wrap gap-2 w-3/4">
                        {formData?.selectedTopics?.map((topic) => (
                            <div
                                key={topic}
                                className="bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center gap-2"
                            >
                                <span>{topic}</span>
                                <button
                                type="button"
                                onClick={() => handleTopicRemove(topic)}
                                className="text-sm text-white hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Dropdown */}
                    <div className="w-1/4 relative group">
                        <select
                            className={`w-full bg-gray-200 border border-gray-400 rounded-lg p-2 outline-none dark:bg-gray-800 dark:text-gray-200 ${
                                formData.selectedTopics.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onChange={(e) => {
                                const selectedTopic = topics.find(
                                (t) => t.subName === e.target.value
                                );
                                if (selectedTopic) handleTopicSelect(selectedTopic);
                            }}
                            defaultValue=""
                            disabled={formData.selectedTopics.length >= 5}
                        >
                            <option value="">
                                Select Topics
                            </option>
                            {topics.map((topic) => (
                                <option key={topic.subName} value={topic.subName}>
                                    {topic.subName}
                                </option>
                            ))}
                        </select>

                        {/* Tooltip */}
                        {formData.selectedTopics.length >= 5 && (
                            <div className="absolute top-full left-0 mt-1 bg-gray-700 text-white text-sm rounded px-2 py-1 shadow-lg hidden group-hover:block">
                                You can select at most 5 topics
                            </div>
                        )}
                    </div>
                </div>


                <div className='flex items-center justify-center pb-4'>
                    {/* disabled={uploading} */}
                    <button type='submit' className=' bg-blue-500 hover:bg-white px-4 py-1 rounded hover:text-blue-500 
                    text-white font-medium transition-all duration-500 hover:border-2 hover:rounded-lg hover:border-blue-500' >
                        Post
                    </button>
                </div>
            </form>
        </div>
    )
}
