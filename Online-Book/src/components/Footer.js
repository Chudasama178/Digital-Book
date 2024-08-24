import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <h4 className="footer-head">Digital Book</h4>
            <hr/>
            <div className="footer">
                <div className="ab">
                    <ul>
                        <h4>Learn More</h4>
                        <hr/>
                        <li><Link to='/'>About us</Link></li>
                        <li><Link to='/'>Categories</Link></li>
                        <li><Link to='/'>Exchange Policy</Link></li>
                        <li><Link to='/'>Read Now</Link></li>
                        <li><Link to='/'>FAQ</Link></li>
                        <li><Link to='/'>Privacy Policy</Link></li>
                    </ul>
                </div>
                <div className="ab">
                    <ul>
                        <h4>Our Community</h4>
                        <hr/>
                        <li><Link to='/'>Terms and Conditions</Link></li>
                        <li><Link to='/'>Spacial Offers</Link></li>
                        <li><Link to='/'>Customer Reviews</Link></li>
                    </ul>
                </div>
                <div className="ab">
                    <ul>
                        <h4>Contect-Info</h4>
                        <hr/>
                        <p>Contect Number: <hr/><p>9726656576</p></p>
                        <p>Email Address: <hr/><p>abc@gmail.com</p></p>
                    </ul>
                </div>
            </div>
            <div className="border bg-gray-20">
                <p className="text-center ragular-14 text-gray-30">2024 Digital-book | All rights resrved.</p>
            </div>
        </>
    );
}
export default Footer;