import {useState, useEffect} from "react";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./index.css";

const AddCard = ({data}) => {
    return (
        <div className="container">
            <b>Job Role: </b>
            <p>{data.role}</p>
            <b>Job Description: </b><p>{data.desc}</p>
            <b>Job location: </b><p>{data.place}</p>
            <b>Contact Info: </b><p>{data.phone}</p>
        </div>
    )
}

const AddJob = () => {
    const [data, setData] = useState({
        role: "",
        desc: "",
        place: "",
        phone: ""
    });
    const [user, setUser] = useState(false);

    const handleChange = (field) => (e) => {
        setData({...data, [field]:e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById("form-job");
        form.checkValidity();
        if(form.reportValidity()){
            await fetch("/add", {
                method: "POST",
                headers: {
                  id: sessionStorage.getItem("t"),
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then((res) => {
                if(!res || res.error){
                    alert("Unable to add job");
                }
                else{
                    setUser(true);
                }
            })
        }
    }
    if(user){
        return <Navigate to="./../"/>
    }
    return(
        <form id="form-job">
            <h2>Add Job Opening</h2>
            <div>
                <label>Job Role:</label>
                <input type="text" value={data.role} onChange={handleChange("role")} required></input>
            </div>
            <div>
                <label>Job Description:</label>
                <input type="text" value={data.desc} onChange={handleChange("desc")} required></input>
            </div>
            <div>
                <label>Job location :</label>
                <input type="text" value={data.place} onChange={handleChange("place")} required></input>
            </div>
            <div>
                <label>Contact phone:</label>
                <input type="number" value={data.phone} onChange={handleChange("phone")} required></input>
            </div>
            <button type="submit" onClick={handleSubmit}>Add</button>
        </form>
    )
}

const Portal = () => {  
    const [data, setData] = React.useState([]);
    useEffect(() => {
        async function get(){
            await fetch("/getJobs", {
                method: "GET",
                headers: {
                    id: sessionStorage.getItem("t"),
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }).then(async (res) => {
                return await res.json();
            }).then((res) => {
                if(res.openings){
                    setData(res.openings);
                }
            })
        }
        get();
    }, []);
    return <div>
        <div className="nav">
            <h2>Able Jobs</h2>
            <Link to="./add"><button>+ Add Job</button></Link>
        </div>
        <h2 className="listhead">Job Listings: </h2>
        <div className="cards">
            {data.map((element, index) => {
                return <AddCard key={(index+element.role)} data={element}/>
            })}
        </div>
    </div>
}

export {Portal, AddJob};