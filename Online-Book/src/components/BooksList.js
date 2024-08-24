import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookList = () => {
    const auth = localStorage.getItem('user');
    const [Books, setBooks] = useState([]);
    const [classes, setClasses] = useState('');
    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        let result = await axios.get('http://localhost:5010/books', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        if (result) {
            setBooks(result.data.data);
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5010/search/${key}`);
            result = await result.json();
            if (result) {
                setBooks(result);
            }
        } else {
            getBooks();
        }

    }
    const showPdf = (pdfFile) => {
        window.open(`http://localhost:5010/files/${pdfFile}`, "_blank", "noreferrer")
    }

    return (
        <div className="admin-home" id="bookList">
            <h3>Books List</h3>
            <div className="container">
                <div className="row">

                    <div className="col">
                        <input type="text" className="search-product-box" placeholder="Search Books" onChange={searchHandle} />

                    </div>
                </div>
            </div>

            <div className="book-list">
                <div className="container-fluid">
                    <div className="row">
                        {
                            Books.length > 0 ? Books.map((item, index) =>
                                <div className="col-3 book-card">
                                    <ul>
                                        <li><img src={item.BookUrl} className="book-img" /></li>
                                        <li>{item.BName} </li>
                                        <li>{item.CName}</li>
                                        {auth ? <li><button className="btn btn-primary" onClick={() => showPdf(item.pdfFile)}>Read</button></li> : <Link to={'/login'} className="btn btn-primary">Log-in & Read Book</Link>}
                                    </ul>
                                </div>


                            )
                                : <h1>NO RECORD FOUND!!!</h1>
                        }

                    </div>
                </div>

            </div>
        </div>

    );
}
export default BookList;