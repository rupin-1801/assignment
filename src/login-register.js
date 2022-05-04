import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './index.css';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [user, setUser] = useState(false);

    const handleChange = (field) => (e) => {
        setData({...data, [field]:e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById("form-login");
        form.checkValidity();
        if(form.reportValidity()){
            await fetch("/login", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                return await res.json();
            }).then((res) => {
                if(!res || res.error){
                    alert("Unable to login");
                }
                else{
                    sessionStorage.setItem("t", (res._id));
                    setUser(true);
                }
            })
        }
    }
    if(user){
        return <Navigate to="./home"/>
    }
    return(
        <form id="form-login">
            <h2>Login</h2>
            <div>
                <label>Email:</label>
                <input type="email" value={data.email} onChange={handleChange("email")} required></input>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={data.password} onChange={handleChange("password")} required></input>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <Link to="./../signup">New user? Signup</Link>
        </form>
    )
}

const Register = () => {
    const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPass: ""
    });
    const [user, setUser] = useState(false);

    const handleChange = (field) => (e) => {
        setData({...data, [field]:e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById("form-signup");
        form.checkValidity();
        if(form.reportValidity()){
            await fetch("/signup", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                return await res.json();
            }).then((res) => {
                if(!res || res.error){
                    alert("Unable to signup");
                }
                else{
                    sessionStorage.setItem("t", (res._id));
                    setUser(true);
                }
            })
        }
    }
    if(user){
        return <Navigate to="./../home"/>
    }
    return(
        <form id="form-signup">
            <h2>Register</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={data.name} onChange={handleChange("name")} required></input>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={data.email} onChange={handleChange("email")} required></input>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={data.password} onChange={handleChange("password")} required></input>
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" value={data.confirmPass} onChange={handleChange("confirmPass")} required></input>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <Link to="./../">Already have an account? login</Link>
        </form>
    )
}

export {Login, Register};