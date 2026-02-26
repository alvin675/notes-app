import { useState } from 'react'
import axios from 'axios';

function Login({ onLogin }) {
  const [isUser, setIsUser] = useState(true);
  const [user, setUser] = useState({
    name: "",  // only for registration
    email: "",
    pass: ""
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const find = isUser ? '/api/login' : '/api/register';   //isUser true then -> login
    const url = `http://localhost:8000${find}`;

    if(!user.email || !user.pass || (!isUser && !user.name)) {
      alert("Please fill all the fields!");
      return;
    }
    try {
      const payload = isUser ? { email: user.email, password: user.pass } : 
                               { name: user.name, email: user.email, password: user.pass};

      const response = await axios.post(url, payload);
      
      const {token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      onLogin(userData);
    }
    catch(err) {
      alert(err.response?.data?.message || "Error! Please solve me!");
    }

  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="card bg-linear-to-b p-12 from-orange-300/50 to-purple-300/50 w-100 h-140 rounded-xl">
        <h1 className="mt-8 font-bold text-2xl mb-10 text-center border-b-1 border-violet-300/50">
          {isUser ? "Welcome Back!" : "Create an account"} 
        </h1>
        <form onSubmit={handleSubmit}>
          {!isUser && 
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Username:
            <input 
              type="text"
              value={user.name}
              onChange={(v) => setUser({...user, name: v.target.value})}
              className="bg-gray-50/40 border border-gray-600/40 text-gray-600 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500/30 block w-full p-2.5 pl-5"
            />
          </label> 
          }
          <label className="block mb-2 text-lg font-medium text-gray-700"> 
            Email: 
            <input 
              type="email"
              value={user.email}
              onChange={(v) => setUser({...user, email: v.target.value})}
              className="bg-gray-50/40 border border-gray-600/40 text-gray-600 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500/30 block w-full p-2.5 pl-5"
            />
          </label>
          <label className="block mb-2 text-lg font-medium text-gray-700"> 
            Password: 
            <input 
              type="password" 
              value={user.pass}
              onChange={(v) => setUser({...user, pass: v.target.value})}
              className="bg-gray-50/40 border border-gray-600/40 text-gray-600 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500/30 block w-full p-2.5 pl-5"
            />
          </label>
          
          <span className="text-sm">
            Already have an account? 
            <button type="button" onClick={() => setIsUser(!isUser)} className="ml-2 font-bold text-blue-400 hover:text-blue-600">
              {isUser ? "Register" : "Log In"}
            </button>
          </span>
          <button type="submit" className=" mx-auto block rounded-full bg-violet-300 pr-6 pl-6 p-2 mt-8 font-bold hover:bg-violet-500 hover:text-white transition duration-300 ease-in-out">
            {isUser ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;