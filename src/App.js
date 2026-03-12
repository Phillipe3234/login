import React, { useState } from 'react';
import './App.css';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home'; // Se você tiver uma página Home

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Começa na home

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'home':
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;