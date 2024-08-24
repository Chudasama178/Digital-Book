import './Layout.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import AdminLogin from './Admin/AdminLogin';

function Layout() {
    // const auth = localStorage.getItem('user')
    // const auth2 = localStorage.getItem('admin');
    return (
        <>
            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/About" element={<AboutUs />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/admin' element={<AdminLogin/>}/>    
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}
export default Layout;