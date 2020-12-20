import React, { useState } from 'react'
import { authenticationService } from '../../services'
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";

const Signup = () => {
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    const changeHandler = ({ target: { name, value } }) => {
        console.log(name, value);
		const copy = { ...formData }
		copy[name] = value
		setFormData(copy)
    }
    
    const submitHandler = () => {
		setShowLoading(true)
        authenticationService.createUser(formData).then(response => {
            console.log(response);
            setFormData({
                name: '',
                email: '',
                password: ''
            })
            toast("User account created and logged in.");
            history.push('/profile')
        }).catch(error => {
            let error_message = error.response && error.response.data ? error.response.data.message : 'Something went wrong. Please try again'
            toast(error_message);
            setShowLoading(false)
        }).finally(() => setShowLoading(false))
	}

    return (
        <>
            <form id="register-form" onSubmit={ev => ev.preventDefault()}>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Name" onChange={changeHandler} value={formData.name} required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address" onChange={changeHandler} value={formData.email} required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password (Min 8 characters)" autoComplete="on" onChange={changeHandler} value={formData.password} required />
                </div>
                <div className="form-submit">
                    <button disabled={showLoading || !formData.name || !formData.email || !formData.password} onClick={() => submitHandler()} className="submit" name="submit" id="submit">Sign Up</button>
                </div>
            </form>
        </>
    )
}

export default Signup
