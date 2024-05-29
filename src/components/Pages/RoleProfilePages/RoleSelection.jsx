import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PathPhoto from '../../Assets/path.png';
import { AppContext } from '../../../App'; 

const RoleSelection = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext); 

  const goToStudentSignup = () => {
    navigate('/student-form');
  };

  const goToFreelancerSignup = () => {
    navigate('/freelancer-form');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  // Conditional rendering based on login status
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-100 p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">You need to login first</h1>
        <button
          onClick={goToLogin}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
        >
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Role Selection</h1>
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md mb-8">
        <img src={PathPhoto} alt="Role Selection Illustration" className="w-full h-auto mb-8" />
        <div className="flex flex-col md:flex-row">
          {/* Student Section */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="font-bold mb-4" style={{ fontSize: '24px' }}>Benefits of Becoming a Student</h2>
            <p className="mb-6 font-normal" style={{ fontSize: '17px' }}>
              As a student, you will have access to a wide range of freelancers who can help you learn new skills and complete your projects efficiently.
              Benefit from personalized teaching, flexible scheduling, and a vast pool of knowledge.
            </p>
            <button
              onClick={goToStudentSignup}
              className="bg-blue-400 font-bold text-white py-2 px-4 rounded hover:bg-blue-500"
            >
              Become a Student
            </button>
          </div>

          {/* Freelancer Section */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="font-bold mb-4" style={{ fontSize: '24px' }}>Benefits of Becoming a Freelancer</h2>
            <p className="mb-6" style={{ fontSize: '17px' }}>
              As a freelancer, you can share your expertise with students who need your skills.
              Enjoy flexible working hours, set your own rates, and gain valuable experience by teaching and helping others.
            </p>
            <button
              onClick={goToFreelancerSignup}
              className="bg-orange-400 font-bold text-white py-2 px-4 rounded hover:bg-orange-500"
            >
              Become a Freelancer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;