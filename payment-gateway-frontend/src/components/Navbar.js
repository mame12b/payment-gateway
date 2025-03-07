import { Link } from "react-router-dom";

const Navbar = ()=> {

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <h1 className="text-lg font-bold">Payment Gateway</h1>
        <div>
          <Link to="/transactions" className="mx-2">Transactions</Link>
          <Link to="/login" className="mx-2">Login</Link>
        </div>
      </nav>

    );
};
export default Navbar;