import React from "react";
import { Link, useNavigate } from "react-router-dom";
function AdminNavbar() {
    const auth2 = localStorage.getItem('admin');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }
    return (
        
        <>
            <section>
                <nav>
                    <div className="logo">
                        <img src="https://i.pinimg.com/originals/b2/38/01/b238018c0a4861898f3f44f78ce3eb2c.jpg" />
                    </div>
                    <ul>
                        <li><Link to="/">Books</Link></li>
                        <li><Link to="/add">Add Books</Link></li>
                        <li><Link to='/userslist'>UersList</Link></li>
                        <li><Link to='/userFeedback'>FeedbackList</Link></li>
                    </ul>
                    <div className="login-btn">
                        {auth2 ? <Link onClick={logout} to="/" className="logout-btn">Logout</Link>
                            : <Link to={'/Admin'} className="admin">Admin</Link>}
                    </div>
                </nav>
            </section>
        </>
    );
}
export default AdminNavbar;