import React, { useState } from 'react'
import { authenticationService } from '../../services'
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const changeHandler = ({ target: { name, value } }) => {
        const copy = { ...formData }
        copy[name] = value
        setFormData(copy)
    }

    const submitHandler = () => {
        setShowLoading(true)
        authenticationService.login(formData).then(response => {
            setFormData({
                email: '',
                password: ''
            })
            toast("Logged in successfully");
            history.push('/profile')
        }).catch(error => {
            let error_message = error.response && error.response.data ? error.response.data.message : 'Something went wrong. Please try again'
            toast(error_message);
        }).finally(() => setShowLoading(false))
    }

    return (
        <>
            <form id="register-form" onSubmit={ev => ev.preventDefault()}>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address" onChange={changeHandler} value={formData.email} required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" autoComplete="on" onChange={changeHandler} value={formData.password} required />
                </div>
                <div className="form-submit">
                    <button disabled={showLoading || !formData.email || !formData.password} onClick={() => submitHandler()} className="submit" name="submit" id="submit">Login</button>
                </div>
            </form>
        </>
    )
}

export default Login
