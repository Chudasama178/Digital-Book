import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { MdDelete, MdEdit } from "react-icons/md";
function FeedbackList(){
    const [Feedback, setFeedback] = useState([]);
    const auth = localStorage.getItem('admin')
    useEffect(() => {
        getFeedbackList();
    }, [auth]);

    const getFeedbackList = async () => {
        let result = await axios.get('http://localhost:5010/feedbackList', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        console.log(result.data)
        if (result) {
            setFeedback(result.data);
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
            await axios.delete(`http://localhost:5010/feedback/${id}`);
            Swal.fire(
              'Deleted!',
              'Feedback has been deleted successfully.',
              'success' 
            );
            getFeedbackList();
          }
        } catch (error) {
          console.log(error);
        }
    };
    return(
        <>
        <div className="admin-home">
    <h3>Feedback List</h3>
    <div className="book-list">
        <table className="feedback-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Comments</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {Feedback.length > 0 ? 
                    Feedback.map((item, index) =>
                        <tr key={item._id}>
                            <td>{item.Name}</td>
                            <td>{item.Comment}</td>
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
export default FeedbackList;