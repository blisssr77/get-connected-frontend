import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';
import { AppContext } from '../../App';


const Signup = (props) => {
    const { handleSignUp } = useContext(AppContext);
    const [form, setForm] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignUp(form);
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const goToSignin = () => {
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                <div className="input">
                        <img src={user_icon} alt="" />
                        <label htmlFor="fullname"/>
                        <input type="text" name="fullname" placeholder="First & Last Name" onChange={handleChange}/>
                    </div><div className="input">
                        <img src={user_icon} alt="" />
                        <label htmlFor="username"/>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="" className="" />
                        <label htmlFor="email"/>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" className="" />
                        <label htmlFor="password"/>
                        <input type="password" name="password" autoComplete="true" placeholder="Password" onChange={handleChange}/>
                    </div>
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit" value="Login">Sign Up</button>
                    <button onClick={goToSignin} type="button" className="gray submit">Sign In</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;