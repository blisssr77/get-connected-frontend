import React, { useContext } from 'react';
import homepageImage from '../Assets/homepage2.webp'; 
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const Homepage = () => {
    const { isLoggedIn } = useContext(AppContext); 
    const navigate = useNavigate();
    const goToSignup = () => {
        if (!isLoggedIn) {
          navigate('/signup');
        } else {
          navigate('/hello-user')
        }
    }
    return (
      <div className="min-h-screen flex flex-col bg-green-200">
          {/* Main Content */}
          <main className="flex flex-1 flex-col md:flex-row items-center justify-between p-8">
              {/* Left Section */}
              <div className="max-w-md text-center md:text-left space-y-6">
                  <h1 className="text-6xl font-extrabold text-gray-900 flex items-center">
                      Welcome to GetConnected
                      <span className='text-7xl text-indigo-600 ml-1'>
                          <ion-icon name="person-add"></ion-icon>
                      </span>
                  </h1>
                  <br></br>

                  <h2 className="text-4xl font-extrabold text-gray-900">
                      Built to help students connect with freelancers worldwide
                  </h2>
                  <p className="text-lg font-bold text-gray-700">
                      GetConnected is a platform that helps students connect with freelancers for teaching and learning purposes. Sign up for a risk-free experience today.
                  </p>
                  <div className="space-y-4 flex flex-col items-center md:items-start">
                      <button onClick={goToSignup} className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700">
                          Sign Up for Free
                      </button>
                  </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
                  <img src={homepageImage} alt="GetConnected Illustration" className="w-full h-auto" />
              </div>
          </main>
      </div>
  );
};

export default Homepage;