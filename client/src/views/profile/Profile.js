import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { authenticationService, userService } from '../../services';
import { toast } from "react-toastify";

const Profile = () => {
    const history = useHistory();
    const currentUser = authenticationService.currentUserValue;
    const [showLoading, setShowLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: currentUser && currentUser.user ? currentUser.user.name : '',
        email: currentUser && currentUser.user ? currentUser.user.email : '',
        password: '',
    })

    const changeHandler = ({ target: { name, value } }) => {
        const copy = { ...formData }
        copy[name] = value
        setFormData(copy)
    }

    const submitHandler = () => {
        setShowLoading(true)
        userService.updatePassword({
            id: currentUser && currentUser.user ? currentUser.user.id : '',
            password: formData.password
        }).then(response => {
            toast("Password updated successfully");
            authenticationService.logout()
            history.push('/')
        }).catch(error => {
            let error_message = error.response && error.response.data ? error.response.data.message : 'Something went wrong. Please try again'
            toast(error_message);
            setShowLoading(false)
        }).finally(() => setShowLoading(false))
    }

    const logout = () => {
        authenticationService.logout()
    }

    return (
        <>
            <div className="main">
                <div className="signup-content">
                    <div className="signup-img">
                        <img src="assets/images/signup-img.svg" alt="" />
                    </div>
                    <div className="signup-form">
                        <form method="POST" className="register-form" id="register-form">
                            <h2 className="gray_100 section_title">Hello {formData.name}!</h2>
                            <h6 className="gray_60 py-3">You can update your profile here</h6>
                            <div className="form-group">
                                <input type="text" name="name" placeholder="Name" defaultValue={formData.name} disabled />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Email Address" defaultValue={formData.email} disabled />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" placeholder="New Password (Min 8 characters)" autoComplete="off" onChange={changeHandler} value={formData.password} />
                            </div>
                            <div className="form-submit">
                                <button disabled={showLoading || !formData.password}  onClick={() => submitHandler()} className="submit" name="submit" id="submit">Update</button>
                            </div>
                            <div className="footer text-left pl-1">
                            <a className="footer_nav_link" onClick={() => logout()} href="/#">Logout</a>
                        </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile
