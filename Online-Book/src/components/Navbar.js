import { Link, useNavigate } from "react-router-dom";
import React from "react";
function Navbar() {
    const auth = localStorage.getItem('user');
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
                        <li><a href='/#home' class="nav-link active">Home</a></li>
                        <li> <a href='/#bookList' class="nav-link ">Books</a></li>
                        <li><a href='/#aboutus' class="nav-link ">About</a></li>
                        <li><a href='/#feedback' class="nav-link ">Feedback</a></li>
                    </ul>

                    <div className="login-btn">
                        {auth ? <Link onClick={logout} to="/" className="logout-btn">Logout ({JSON.parse(auth).Name})</Link>
                            : <Link to={'/login'}>Log-in</Link>}
                        <Link to='/admin' className="admin">Admin</Link>
                    </div>
                </nav>
            </section>                                                                                                                              
        </>
    );

}
export default Navbar;