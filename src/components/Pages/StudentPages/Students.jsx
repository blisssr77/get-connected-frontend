import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';

const Students = (props) => {
    const { students, handleStudentLike, deleteLikedStudent } = useContext(AppContext);
    const [search, setSearch] = useState('');
    const [liked, setLiked] = useState(() => {
        // Get liked students from local storage
        const saved = localStorage.getItem("likedStudents");
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        // Saving to local storage whenever liked state changes
        localStorage.setItem("likedStudents", JSON.stringify(liked));
    }, [liked]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredStudents = students?.filter(student => {
        return Object.values(student).some(value =>
            value != null && value.toString().toLowerCase().includes(search.toLowerCase())
        );
    });

    const handleLikeClick = async (studentId) => {
        if (liked[studentId]) {
            await handleRemoveLike(studentId);
        } else {
            await handleStudentLike(studentId);
        }
        setLiked(prevLiked => ({
            ...prevLiked,
            [studentId]: !prevLiked[studentId]
        }));
    };

    const handleRemoveLike = async (studentId) => {
        await deleteLikedStudent(studentId);
    };

    const loaded = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents?.map((student, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-lg w-full">
                        {student.photo && (
                            <img
                                src={URL.createObjectURL(student.photo)}
                                alt={student.fullname}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        )}
                        <div className="text-center">
                            <h3 className="text-xl font-bold">{student.fullname}</h3>
                            <p className="text-gray-600">{student.location}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-700"><strong>Age:</strong> {student.age}</p>
                            <p className="text-gray-700"><strong>Career:</strong> {student.career}</p>
                            <p className="text-gray-700"><strong>Hobby:</strong> {student.hobby}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {student.description}</p>
                        </div>
                        <div className="mt-4">
                            <Link to={`/students/${student._id}`}>
                                <button className="bg-indigo-500 text-white px-4 text-sm py-2 font-semibold rounded-md hover:bg-indigo-600">Leave Comments</button>
                            </Link>
                        </div>
                        <div className='flex'>
                            <span 
                                className="text-3xl ml-auto cursor-pointer"
                                onClick={() => handleLikeClick(student._id)}
                            >
                                <ion-icon name={liked[student._id] ? "heart" : "heart-outline"}></ion-icon>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const loading = () => {
        return <h1 className="text-center text-2xl font-bold">No students found.</h1>;
    };

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Students</h2>
                <div className="max-w-md mx-auto mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search students..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {students && students.length > 0 ? loaded() : loading()}
            </div>
        </div>
    );
};

export default Students;