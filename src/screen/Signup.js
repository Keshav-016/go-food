import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("working");
        const response = await fetch('https://go-food-backen.onrender.com/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                password: credentials.password,
                email: credentials.email,
                location: credentials.geolocation
            })
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            if (json.error === 'Email already exist')
                alert(json.error);
            else
                alert("Enter valid credentials")
        }
        else {
            navigate('/login');
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container'>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" className="form-control" placeholder="Enter Name" name="name" id="name" value={credentials.name} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className='form-label'>Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onchange} />
                        <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className='form-label'>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={credentials.password} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Address" className='form-label'>Address</label>
                        <input type="text" className="form-control" placeholder="Enter Address" id="Address" name="geolocation" value={credentials.geolocation} onChange={onchange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to={'/login'} className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}
