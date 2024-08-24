import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [])
    const handleLogin = async () => {
        if (!Email || !Password) {
            setError(true);
            return false;
        }
        let result = await fetch('http://localhost:5010/login', {
            method: 'POST',
            body: JSON.stringify({ Email, Password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/')
        } else {
            alert("PLEASE ENTER CURRECT DETAIL")
        }
    }
    const handleSignUp = async () => {
        navigate('/signup')
    }
    return (
        <table align='center' className='login-tbl'>
            <div className='login'>
                <h1 id='head'>Log In</h1>
                <input className="inputBox" type="text"
                    value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                {error && !Email && <span className='invalid-input'>please enter email</span>}
                <input className="inputBox" type="password"
                    value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                {error && !Password && <span className='invalid-input'>please enter password</span>}
                <button onClick={handleLogin} className='btn' type='button'>Login</button>
                <p className='text-black font-bold'>Create account?<span><button onClick={handleSignUp}>SignUp</button></span></p>
                <div>
                    <input type='checkbox' name='' id='' className='chkbox' />
                    <p>By continuing, i agree to the terms of use and privacy policy.</p>
                </div>
            </div>
        </table>
    );
}
export default Login;