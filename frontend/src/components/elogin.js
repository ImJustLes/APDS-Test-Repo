import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import stylesheet from '../components/stylesheet.css'

const EmployeeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    var token;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:433/elogin', 
                { email, password },
                { withCredentials: true }
            )
            
            token = response.data.token;
            const userType = 'Employees';
            const _id = response.data._id;

            // Store data in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userType', userType);
            localStorage.setItem('_id', _id);
            alert(response.data.message);

            console.log(`Token : ${token}`);

            // Redirect employee to their view
            navigate(`/Employee/employeeViewPayments/${_id}`);
        } catch (error) {
            if (error.response) {
                console.error(`Error Response: ${error.response.data}`);
                alert(`Login Failed: ${error.response.data.message || error.message}`);
            } else if (error.request) {
                console.error('Error Request:', error.request);
                alert('Login Failed: No response received from the server.');
            } else {
                console.error('Error:', error.message);
                alert(`Login Failed: ${error.message}`);
            }
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Employee Login</h1>

            <div>
                <label>Email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
                <label>Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type='submit' style={{ padding: '10px 20px', margin: '10px' }}>Login</button>
            <button type="button" onClick={() => navigate('/register')} style={{ padding: '10px 20px', margin: '10px' }}>Register</button>
        </form>
    );
};

export default EmployeeLogin;
