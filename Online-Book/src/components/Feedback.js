import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Feedback() {
    const [Name, setName] = React.useState("");
    const [Comment, setComment] = React.useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Name", Name);
        formData.append("Comment", Comment);
        console.log(Name,Comment)
        const result = await axios.post("http://localhost:5010/feedBack",
            formData,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        setName("");
        setComment(""); 
    }
    return (
        <>
         
                <div class="feedback-container"id="feedback">
                    <h1>Leave a Comment</h1>
                    <form id="commentForm">
                        <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
                        <textarea id="comment" name="comment" rows="4" cols="50" maxlength="500" required value={Comment} onChange={(e)=>setComment(e.target.value)} placeholder="Type comment" className="textarea"></textarea>
                        <button type='button' onClick={submit} className='feedback-btn' >Submit</button>
                    </form>
                </div>
         

        </>
    );
}
export default Feedback;