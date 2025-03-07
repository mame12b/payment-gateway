import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ()=> {

    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    const handleLogin = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const respones = await axios.post("http://localhost:5000/api/users/login",{
                email,
                password,
            });
        if (respones.data.token) {
          localStorage.setItem('token', respones.data.data);  
          alert('login successful');
          navigate('/transactions');          
        } else {
            setError('invalid credentials please try again');
        }
         
    }catch (error) {
        setError('login failed. please cher ur credentials.')
    }
    setLoading(false); 
    };


    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
    
          {error && <p className="text-red-500 mb-2">{error}</p>} {/* Error message */}
    
          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="border p-2 w-full mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="border p-2 w-full mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`p-2 w-full text-white ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      );
};
export default Login;