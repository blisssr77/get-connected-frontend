import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';

const RoleProfile = () => {
    const { students, freelancers, getRoleProfileData } = useContext(AppContext);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filteredFreelancers, setFilteredFreelancers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getRoleProfileData();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (students) {
            setFilteredStudents(students);
        }
        if (freelancers) {
            setFilteredFreelancers(freelancers);
        }
    }, [students, freelancers]);

    const loadedStudents = () => {
        return (
            <div className="flex flex-wrap justify-center gap-6">
                {filteredStudents?.map((student, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-lg w-full flex flex-col items-center rounded-l-full rounded-r-full">
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
                            <Link to={`/role-profile/${student._id}`}>
                                <button className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-500" style={{fontSize:"13px"}}>Update Student Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const loadedFreelancers = () => {
        return (
            <div className="flex flex-wrap justify-center gap-6">
                {filteredFreelancers?.map((freelancer, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-lg w-full flex flex-col items-center rounded-l-full rounded-r-full">
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
                            <p className='text-gray-700'><strong>Degree:</strong> {freelancer.degree}</p>
                            <p className="text-gray-700"><strong>Experience:</strong> {freelancer.experience}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {freelancer.description}</p>
                        </div>
                        <div className="mt-4">
                            <Link to={`/role-profile/${freelancer._id}`}>
                                <button className="text-white px-4 py-2 rounded-md font-semibold bg-orange-400 hover:bg-orange-500" style={{fontSize:"13px"}}>Update Freelancer Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const loading = () => {
        return <h1 className="text-center text-2xl font-bold">No profiles found.</h1>;
    };

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Profiles</h2>
                {filteredStudents.length > 0 ? loadedStudents() : loading()}
                {filteredFreelancers.length > 0 ? loadedFreelancers() : loading()}
            </div>
        </div>
    );
};

export default RoleProfile;