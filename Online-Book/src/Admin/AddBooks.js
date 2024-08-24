import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const AddBooks = () => {
    const [BName, setBName] = React.useState("");
    const [Board, setBoard] = React.useState("");
    const [CName, setCName] = React.useState("");
    const [BookUrl, setBookUrl] = React.useState("");
    const [pdfFile, setpdfFile] = React.useState("");
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("BName", BName);
        formData.append("Board", Board);
        formData.append("CName",CName);
        formData.append("BookUrl", BookUrl);
        formData.append("pdfFile", pdfFile);
        console.log(BName,Board, BookUrl, pdfFile);
        const result = await axios.post("http://localhost:5010/add-book",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        navigate('/');
    }
    return (
        <table align='center' className='AddBook'>
            <div className='product'>
                <h1 id='head'>Add Books</h1>
                <input type='text' className='inputBox' value={BName} onChange={(e) => setBName(e.target.value)} placeholder='Enter Book Name' />
                {error && !BName && <span className='invalid-input'>Enter Valid BName</span>}
                <input type='text' className='inputBox' value={Board} onChange={(e) => setBoard(e.target.value)} placeholder='Enter Board' />
                {error && !Board && <span className='invalid-input'>Enter Valid Board</span>}
                <input type='text' className='inputBox' value={CName} onChange={(e) => setCName(e.target.value)} placeholder='Enter Class Name' />
                {error && !CName && <span className='invalid-input'>Enter Valid Board</span>}
                <input type="text" className='inputBox' value={BookUrl} onChange={(e) => setBookUrl(e.target.value)} placeholder='Enter BookImg' />
                {error && !BookUrl && <span className='invalid-input'>Enter Valid BookImg</span>}
                <input type='file' className='form-control inputBox' onChange={(e) => setpdfFile(e.target.files[0])} accept='application/pdf' required />
                <button type='button' onClick={submit} className='btn' >Add Book</button>
            </div>
        </table>
    )
}
export default AddBooks;


