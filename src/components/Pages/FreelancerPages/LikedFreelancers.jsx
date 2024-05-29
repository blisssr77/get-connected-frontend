import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';

const LikedFreelancers = () => {
    const { getLikedFreelancers, likedFreelancers, deleteLikedFreelancer } = useContext(AppContext);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getLikedFreelancers();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRemoveLike = async (freelancerId) => {
        await deleteLikedFreelancer(freelancerId);
    };

    const filteredLikedFreelancers = likedFreelancers?.filter(({ freelancerId }) => {
        return freelancerId && Object.values(freelancerId).some(value =>
            value != null && value.toString().toLowerCase().includes(search.toLowerCase())
        );
    });

    const loaded = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLikedFreelancers?.map(({ freelancerId }, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-lg w-full">
                        {freelancerId.photo && (
                            <img
                                src={URL.createObjectURL(freelancerId.photo)}
                                alt={freelancerId.fullname}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        )}
                        <div className="text-center">
                            <h3 className="text-xl font-bold">{freelancerId.fullname}</h3>
                            <p className="text-gray-600">{freelancerId.location}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-700"><strong>Age:</strong> {freelancerId.age}</p>
                            <p className="text-gray-700"><strong>Career:</strong> {freelancerId.career}</p>
                            <p className="text-gray-700"><strong>Hobby:</strong> {freelancerId.hobby}</p>
                            <p className="text-gray-700"><strong>Degree:</strong> {freelancerId.degree}</p>
                            <p className="text-gray-700"><strong>Experience:</strong> {freelancerId.experience}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {freelancerId.description}</p>
                        </div>
                        <div className="mt-4">
                            <Link to={`/freelancers/${freelancerId._id}`}>
                                <button className="bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-indigo-600">Leave Comments</button>
                            </Link>
                        </div>
                        <div className='flex'>
                            <span 
                                className="text-3xl ml-auto cursor-pointer"
                                onClick={() => handleRemoveLike(freelancerId?._id)}
                            >
                                <ion-icon name="heart"></ion-icon>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const loading = () => {
        return <h1 className="text-center text-2xl font-bold">No liked freelancers found.</h1>;
    };

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Liked Freelancers</h2>
                <div className="max-w-md mx-auto mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search liked freelancers..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {likedFreelancers && likedFreelancers.length > 0 ? loaded() : loading()}
            </div>
        </div>
    );
};

export default LikedFreelancers;