import React, { useState } from "react";
import axios from "axios";

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefualt();
        
        try {
    const res = await axios.post("http://localhost:8000/api/users/login", {
email,
password,        
    });
    localStorage.setItem('token', res.data.token);
    alert('login successul')
        } catch (error) {
            alert('login failed');
            
        }
    };
    return (
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      );

};
export default Login;
