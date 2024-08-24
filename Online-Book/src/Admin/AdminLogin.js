import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
const AdminLogin = () => {
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('admin')
        if (auth) {
            navigate('/AdminHome')
        }
    }, [])
    const handleLogin = async () => {
        if (!Email || !Password) {
            setError(true);
            return false;
        }
        let result = await fetch('http://localhost:5010/admin/login', {
            method: 'POST',
            body: JSON.stringify({ Email, Password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem('admin', JSON.stringify(result.admin));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/')
            window.location.reload();       
        } else {
            alert("PLEASE ENTER CURRECT DETAIL")
        }
    }
    return (
        <table align='center' className='login-admin-tbl'>
            <div className='login'>
                <h1 id='head'>Log In</h1>
                <input className="inputBox" type="text"
                    value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                {error && !Email && <span className='invalid-input'>please enter Valid email</span>}
                <input className="inputBox" type="password"
                    value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                {error && !Password && <span className='invalid-input'>please enter Valid password</span>}
                <button onClick={handleLogin} className='btn' type='button'>Login</button>
            </div>
       
        </table>
    );
}
export default AdminLogin;