import React, {useEffect, useState} from "react"
import axios from "axios"
//import { response } from "/../backend/app"
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import stylesheet from '../stylesheet.css'  // Import CSS file here
import { useParams } from 'react-router-dom';

const UseEmployeeViewPayments = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://127.0.0.1:433/GetPayments')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching all transactions:', error);
      });
  }, []); //return/store as an array

    return( 
      <div className="container">
      <h2>Employee Portal</h2>
      <table>
        <thead>
          <tr>
            <th>payID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>paymentStatus</th>
            <th>SWIFT</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.payID}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.paymentStatus}</td>
              <td>{transaction.SWIFT}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => navigate('/Employee/verifyPayments')} style={{  padding: '10px 20px', margin: '10px' }}>Verify Payments</button>
    </div>
    )

}
export default UseEmployeeViewPayments