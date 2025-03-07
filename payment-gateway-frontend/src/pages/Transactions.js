import { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {

    const [Transactions, setTransactions] = useState('');

    useEffect(() => {
     axios.get("http://localhost:5000/api/transactions")
     .then((res)=> setTransactions(res.data))
     .catch((err)=>console.error(err));
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-5">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          {Transactions.length > 0 ? (
            <ul>
              {Transactions.map((tx) => (
                <li key={tx._id} className="border p-2 mb-2">
                  <p><strong>Amount:</strong> {tx.amount} ETB</p>
                  <p><strong>Provider:</strong> {tx.provider}</p>
                  <p><strong>Status:</strong> {tx.status}</p>
                </li>
              ))}
            </ul>
          ) : <p>No transactions found.</p>}
        </div>
      );
};
export default Transactions;