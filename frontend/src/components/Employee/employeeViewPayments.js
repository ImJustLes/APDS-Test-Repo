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
    axios.get('https://127.0.0.1:433/view_banking_details/${employeeId}')
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
            <th>Transaction ID</th>
            <th>Customer ID</th>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.transactionID}</td>
              <td>{transaction.customerID}</td>
              <td>{transaction.paymentID}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => navigate('/Employee/verifyPayments')} style={{  padding: '10px 20px', margin: '10px' }}>Verify Payments</button>
    </div>
    )

}
export default UseEmployeeViewPayments