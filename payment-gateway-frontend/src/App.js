import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
//import Navbar from "./components/Navbar";
//import Login from './components/Login';
import Login from './pages/Login';
import TransactionList from './components/TransactionList';
//import  Transactions  from "./pages/Transactions";


const App = () => {
  return (
<Router>
  <Routes>
    <Route path ="/" element={<Login/>} />
    <Route path ="/transactions" element ={<TransactionList/>} />
    </Routes>
    </Router>
  );
};

export default App;
