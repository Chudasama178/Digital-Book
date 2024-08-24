import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const navigate = useNavigate("");
    const [error, setError] = React.useState(false);
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');

        }
    }, [])

    const collctdata = async () => {
        if (!Name || !Email || !Password) {
            setError(true);
            return false;
        }
        let result = await fetch('http://localhost:5010/register', {
            method: 'POST',
            body: JSON.stringify({ Name, Email, Password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));

        navigate('/');
    }
    return (
        <table align="center" className="login-tbl">
            <div className="ragister">
                <h1 id="head">
                    Registration</h1>
                <input className="inputBox" type="text"
                    value={Name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                {error && !Name && <span className='invalid-input'>please enter name</span>}
                <input className="inputBox" type="text"
                    value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                {error && !Email && <span className='invalid-input'>please enter email</span>}
                <input className="inputBox" type="password"
                    value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter password" />
                {error && !Password && <span className='invalid-input'>please enter password</span>}
                <button type="button" onClick={collctdata} className="btn">Sign Up</button>
            </div>
        </table>
    );
}

export default SignUp;

