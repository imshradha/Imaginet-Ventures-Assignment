import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()

    const [ user, setUser] = useState({
        name: "",
        mobile:"",
        email:"",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, mobile, email, password } = user
        if( name && mobile && email && password ){
            axios.post("http://localhost:8000/register", user)
            .then( res => {
                alert(res.data.message)
                navigate("/")
            })
        } else {
            alert("Please enter the user details")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Enter your name" onChange={ handleChange }></input>
            <input type="text" name="mobile" value={user.mobile} placeholder="Enter your mobile number" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Enter your email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Enter your password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/")}>Login</div>
        </div>
    )
}

export default Register;