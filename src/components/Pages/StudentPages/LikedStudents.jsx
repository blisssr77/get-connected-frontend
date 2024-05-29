import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';

const LikedStudents = () => {
    const { getLikedStudents, likedStudents, deleteLikedStudent } = useContext(AppContext);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getLikedStudents();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRemoveLike = async (studentId) => {
        await deleteLikedStudent(studentId);
    };

    const filteredLikedStudents = likedStudents?.filter(({ studentId }) => {
        return studentId && Object.values(studentId).some(value =>
            value != null && value.toString().toLowerCase().includes(search.toLowerCase())
        );
    });

    const loaded = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLikedStudents?.map(({ studentId }, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-lg w-full">
                        {studentId.photo && (
                            <img
                                src={URL.createObjectURL(studentId.photo)}
                                alt={studentId.fullname}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        )}
                        <div className="text-center">
                            <h3 className="text-xl font-bold">{studentId.fullname}</h3>
                            <p className="text-gray-600">{studentId.location}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-700"><strong>Age:</strong> {studentId.age}</p>
                            <p className="text-gray-700"><strong>Career:</strong> {studentId.career}</p>
                            <p className="text-gray-700"><strong>Hobby:</strong> {studentId.hobby}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {studentId.description}</p>
                        </div>
                        <div className="mt-4">
                            <Link to={`/students/${studentId._id}`}>
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Leave Comments</button>
                            </Link>
                        </div>
                        <div className='flex'>
                            <span 
                                className="text-3xl ml-auto cursor-pointer"
                                onClick={() => handleRemoveLike(studentId?._id)}
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
        return <h1 className="text-center text-2xl font-bold">No liked students found.</h1>;
    };

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Liked Students</h2>
                <div className="max-w-md mx-auto mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search liked students..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {likedStudents && likedStudents.length > 0 ? loaded() : loading()}
            </div>
        </div>
    );
};

export default LikedStudents;