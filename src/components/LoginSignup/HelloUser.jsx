import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import robot from '../Assets/robot.webp';
import { AppContext } from '../../App';

const HelloUser = () => {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        
        <div className="min-h-screen flex flex-col items-center justify-center bg-100 p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Hello, {user?.fullname || 'User'}!</h1>
            <img src={robot} alt="Cute Dog" className="max-w-xs w-full h-auto rounded-lg shadow-lg mb-8" />
            <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
            >
                Go to Homepage
            </button>
            <h4 className='text-white'>We will redirect you in 5 second . .</h4>
        </div>
    );
};

export default HelloUser;