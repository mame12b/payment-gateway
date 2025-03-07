import { useEffect, useState } from "react";
import  axios  from "axios";

const TransactionList = () => {
    const [transaction, setTransaction]= useState([]);
    
    useEffect (() => {
        const fetchTransactions = async () =>{
            const token= localStorage.getItem('token');
            const res = await axios.get("http://localhost:5000/api/transactions", {
                headers : {Authorization: `Bearer ${token}`},
            });
            setTransaction(res.data);

        };
        fetchTransactions();

    }, []);

    return (
        <div>
          <h2>Transactions</h2>
          <ul>
            {transaction.map((txn) => (
              <li key={txn._id}>
                {txn.amount} {txn.currency} - {txn.provider}
              </li>
            ))}
          </ul>
        </div>
      );
};
export default TransactionList;