import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

import { MdDelete, MdEdit } from "react-icons/md";
function UserList() {
    const [Users, setUsers] = useState([]);
    const auth = localStorage.getItem('admin')
    useEffect(() => {
        getUsers();
    }, [auth]);
    const getUsers = async () => {
        let result = await axios.get('http://localhost:5010/getUsers', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        console.log(result.data)
        if (result) {
            setUsers(result.data);
        }
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
            await axios.delete(`http://localhost:5010/user/${id}`);
            Swal.fire(
              'Deleted!',
              'User has been deleted successfully.',
              'success' 
            );
            getUsers();
          }
        } catch (error) {
          console.log(error);
        }
    };
    return (
        <>
        <div className="admin-home">
    <h3>User List</h3>
    <div className="book-list">
        <table className="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {Users.length > 0 ? 
                    Users.map((item, index) =>
                        <tr key={item._id}>
                            <td>{item.Name}</td>
                            <td>{item.Email}</td>
                            <td>
                                <MdDelete style={{fontSize:30}} onClick={() => { handleDeleteUser(item._id) }} className="delete" />
                            </td>
                        </tr>
                    )
                :
                    <tr>
                        <td colSpan="3">NO RECORD FOUND!!!</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
</div>

        </>);
}
export default UserList;