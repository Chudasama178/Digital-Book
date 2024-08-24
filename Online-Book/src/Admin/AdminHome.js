import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


import { MdDelete, MdEdit } from "react-icons/md";
const AdminHome = () => {
    const [Books, setBooks] = useState([]);
    const navigate = useNavigate();
  
    const auth = localStorage.getItem('admin')
    
    useEffect(() => {
        getBooks();
    }, [auth]);

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
    const updateBook = async(id)=>{
        let result = await fetch(`http://localhost:5010/book/${id}`,{
            method:"PUT"
        });
        result = await result.json();

    }
    const handleDeleteUser = async (id) => {
        try {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          });
    
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:5010/book/${id}`);
            Swal.fire(
              'Deleted!',
              'User has been deleted successfully.',
              'success' 
            );
            getBooks();
          }
        } catch (error) {
          console.log(error);
        }
    };
    return (
<div className="admin-home">
    <h3>Books List</h3>
    <input type="text" className="search-product-box" placeholder="Search Books" onChange={searchHandle} />
    <div className="book-list">
        <table className="book-table">
            <thead>
                <tr>
                    <th>BookImg</th>
                    <th>BName</th>
                    <th>CName</th>
                    <th>Board</th>
                    <th>BookFile</th>
                    <th colSpan={2}>Operations</th>
                </tr>
            </thead>
            <tbody>
                {Books.length > 0 ? 
                    Books.map((item, index) =>
                        <tr key={item._id}>
                            <td><img src={item.BookUrl} className="admin-book-img" alt="Book Cover" /></td>
                            <td>{item.BName}</td>
                            <td>{item.CName}</td>
                            <td>{item.Board}</td>
                            <td><button className="btn btn-primary" onClick={() => showPdf(item.pdfFile)}>ShowPdf</button></td>
                                <td><MdEdit style={{fontSize:30}} className="edit" /></td>
                                <td><MdDelete style={{fontSize:30}} onClick={() => { handleDeleteUser(item._id) }} className="delete" /></td>
                        </tr>
                    )
                :
                    <tr>
                        <td colSpan="6">NO RECORD FOUND!!!</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
</div>



    );
}
export default AdminHome;