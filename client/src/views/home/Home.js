import React, { useState } from 'react'
import Login from '../login/Login';
import Signup from '../signup/Signup';

const Home = () => {
    const [activeForm, setActiveForm] = useState('login')

    const formChangeHandler = (formType) => {
        if (activeForm === formType) return;
        setActiveForm(formType)
    }

    return (
        <>
            <div className="main">
                <div className="signup-content">
                    <div className="signup-img">
                        <img src="assets/images/signup-img.svg" alt="" />
                    </div>
                    <div className="signup-form">
                        <div className="register-form">
                            <h4 className="gray_100 section_title">Get more things done with us</h4>
                            <h5 className="gray_60 d-none d-sm-block">Search sourcing the world's brightest professionals for your business</h5>
                            <nav className="nav home-nav">
                                <a onClick={() => formChangeHandler('login')} className={`nav-link pl-0 ${activeForm === 'login' ? "active" : ""}`} href="/#">Login</a>
                                <a onClick={() => formChangeHandler('signup')} className={`nav-link ${activeForm === 'signup' ? "active" : ""}`} href="/#">Sign up</a>
                            </nav>
                            {activeForm === 'login' ? (<Login />) : (<Signup />)}   
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
