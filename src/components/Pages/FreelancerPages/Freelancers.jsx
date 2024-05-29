import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';

const Freelancers = (props) => {
    const { freelancers, handleFreelancerLike, deleteLikedFreelancer } = useContext(AppContext);
    const [search, setSearch] = useState('');
    const [liked, setLiked] = useState(()=>{
        // getting liked freelancers from local storage
        const saved = localStorage.getItem("likedFreelancers");
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        // saving to local storage whenever liked state changes
        localStorage.setItem("likedFreelancers", JSON.stringify(liked));
    }, [liked]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredFreelancers = freelancers?.filter(freelancer => {
        return Object.values(freelancer).some(value =>
            value != null && value.toString().toLowerCase().includes(search.toLowerCase())
        );
    });

    const handleLikeClick = async (freelancerId) => {
        if (liked[freelancerId]) {
            await handleRemoveLike(freelancerId);
        } else {
            await handleFreelancerLike(freelancerId);
        }
        setLiked(prevLiked => ({
            ...prevLiked,
            [freelancerId]: !prevLiked[freelancerId]
        }));
    };

    const handleRemoveLike = async (freelancerId) => {
        await deleteLikedFreelancer(freelancerId);
    }

    const loaded = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers?.map((freelancer, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-lg w-full">
                        {freelancer.photo && (
                            <img
                                src={URL.createObjectURL(freelancer.photo)}
                                alt={freelancer.fullname}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        )}
                        <div className="text-center">
                            <h3 className="text-xl font-bold">{freelancer.fullname}</h3>
                            <p className="text-gray-600">{freelancer.location}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-700"><strong>Age:</strong> {freelancer.age}</p>
                            <p className="text-gray-700"><strong>Career:</strong> {freelancer.career}</p>
                            <p className="text-gray-700"><strong>Hobby:</strong> {freelancer.hobby}</p>
                            <p className="text-gray-700"><strong>Degree:</strong> {freelancer.degree}</p>
                            <p className="text-gray-700"><strong>Experience:</strong> {freelancer.experience}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {freelancer.description}</p>

                        </div>
                        <div className="mt-4">
                            <Link to={`/freelancers/${freelancer._id}`}>
                                <button className="bg-indigo-500 text-white text-sm px-4 py-2 font-semibold rounded-md hover:bg-indigo-600">Leave Comments</button>
                            </Link>
                        </div>
                        <div className='flex'>
                            <span 
                                className="text-3xl ml-auto cursor-pointer"
                                onClick={() => handleLikeClick(freelancer._id)}
                            >
                                <ion-icon name={liked[freelancer._id] ? "heart" : "heart-outline"}></ion-icon>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const loading = () => {
        return <h1 className="text-center text-2xl font-bold">No freelancers found.</h1>;
    };

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Freelancers</h2>
                <div className="max-w-md mx-auto mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search freelancers..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {freelancers && freelancers.length > 0 ? loaded() : loading()}
            </div>
        </div>
    );
};

export default Freelancers;