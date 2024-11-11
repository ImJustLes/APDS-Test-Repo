import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useParams } from 'react-router-dom'
import stylesheet from '../stylesheet.css'

const UseVerifyPayment = () => {
    const [payID, setPayID] = useState('');
    
    const navigate = useNavigate()
    

    const handleVerifyPayment = (e) => {
        e.preventDefault();
        
        axios.patch(`https://127.0.0.1:433/verify_payment/${payID}`, {
            payID,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            alert("Verification successful");
        })
        .catch(error => {
            console.error('An error occurred while processing payment', error);
        });
    };

    return (
        <form onSubmit={handleVerifyPayment}>
        <div>
        <div className="container">
        <h2>Verify Payment</h2>
            <label>PayID</label>
            <input type="text" value={payID} onChange={(e) => setPayID(e.target.value)} required/>
        </div>
        
        <button type="submit">Verify Payment</button>
        
        </div>
    </form>
    );
};

export default UseVerifyPayment
