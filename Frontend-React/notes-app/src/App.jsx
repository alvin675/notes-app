import { useState } from 'react'
import { useEffect } from 'react';
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setIsAuthenticated(true);
    } 
  }, []);

  return (
    <div>
      {isAuthenticated ? ( <Notes /> ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;

