import React from 'react';
import './Home.css';

const Home = ({ setCurrentPage }) => {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1>Bem-vindo à Fraternidade São João Paulo II</h1>
        <p>Faça login ou cadastre-se para acessar todas as funcionalidades</p>
        <div className="home-buttons">
          <button 
            className="home-button primary"
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
          <button 
            className="home-button"
            onClick={() => setCurrentPage('register')}
          >
            Cadastro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;