import './Layout.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminNavbar from './Admin/AdminNavbar';
import AdminHome from './Admin/AdminHome';
import AddBooks from './Admin/AddBooks';
import AdminLogin from './Admin/AdminLogin';
import UpdateBooks from './Admin/UpdateBooks';
import UserList from './Admin/UserList';
import FeedbackList from './Admin/FeedbacList';
function AdminLayout() {
    return (
        <>
            <div className="App">
                <BrowserRouter>
                    <AdminNavbar />
                    <Routes>
                        <Route path='/' element={<AdminHome />} />
                        <Route path='/add' element={<AddBooks />} />
                        <Route path='/Admin' element={<AdminLogin />} />
                        <Route path='/update' element={<UpdateBooks />} />
                        <Route path='/userslist' element={<UserList/>}/>
                        <Route path='/userFeedback' element={<FeedbackList/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}
export default AdminLayout;