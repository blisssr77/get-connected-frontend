import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { AppContext } from '../../App';

const Navbar = () => {
    const { isLoggedIn, handleLogout } = useContext(AppContext);
    let Links = [
        {name:"HOME", link:"/"},
        {name:"LOGIN / SIGNUP", link:"/login"},
    ];

    if (isLoggedIn) {
        Links = [
            {name:"Home", link:"/"},
            {name:"Students", link:"/students"},
            {name:"Freelancers", link:"/freelancers"},
        ];
    }

    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const navRef = useRef(null);

    const goToUserRole = () => {
        console.log('trying to navigate to /user-role-form');
        navigate('/role-selection');
    };

    const goToHomepage = () => {
        navigate('/');
    };

    const goToRoleProfile = () => {
        navigate('/role-profile')
    }

    const goToLikedStudents = () => {
        navigate('/liked-students')
    }

    const goToLikedFreelancers = () => {
        navigate('/liked-freelancers')
    }

    const toggleProfileDropdown = () => {
        setProfileOpen(!profileOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpen(false);
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7' ref={navRef}>
                <div className='font-extrabold text-3xl cursor-pointer flex items-center font-[quicksand] text-gray-800'>
                    <span onClick={goToHomepage}>GetConnected</span>
                    <span className='text-xl3 text-indigo-600 mr-1 pt-2'>
                        <ion-icon name="person-add"></ion-icon>
                    </span>
                </div>
                
                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center font-semibold md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                    {Links.map((link) => (
                        <li style={{fontSize:'15px'}} key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                            <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
                        </li>
                    ))}
                    
                    {isLoggedIn && (
                        <li className='md:ml-8 relative'>
                            <button onClick={toggleProfileDropdown} className=' text-gray-800 hover:text-gray-400 duration-500 cursor-pointer' style={{fontSize: '15px'}}>
                                Account
                            </button>
                            {profileOpen && (
                                <ul className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                                    <li onClick={goToLikedStudents} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer' ><span className="text-xl"><ion-icon name="heart-circle-outline"></ion-icon></span>Liked Students</li>
                                    <li onClick={goToLikedFreelancers} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer' ><span className="text-xl"><ion-icon name="heart-circle-outline"></ion-icon></span>Liked Frelancers</li>
                                    <li onClick={goToRoleProfile} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer' ><span className='text-xl'><ion-icon name="person-circle-outline"></ion-icon></span>My Role Profile</li>
                                    <li onClick={handleLogout} className='block px-4 py-2 text-sm font-extrabold text-gray-700 hover:bg-gray-100 cursor-pointer' >LOGOUT<span className='text-xl'><ion-icon name="finger-print-outline"></ion-icon></span></li>
                                </ul>
                            )}
                        </li>
                    )}

                    <Button onClick={goToUserRole}>
                        Get Started 
                    </Button>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;