import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import ForgotPasswordModal from './ForgotPasswordModal';
import { supabase } from '../supabaseClient';
import logoImage from '../logo_fsjpii.jpg';

const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotModal, setForgotModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const containerRef = useRef(null);
  const loginCardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginCardRef.current && !loginCardRef.current.contains(e.target)) {
        setCurrentPage('home');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setCurrentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      
      alert('Login realizado com sucesso!');
      setCurrentPage('home');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper" ref={containerRef}>
      <div className={`container ${isActive ? 'active' : ''}`} id="container" ref={loginCardRef}>
        <button className="modal-close" onClick={() => setCurrentPage('home')}>×</button>
        
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <div className="password-wrapper">
              <input type="password" placeholder="Password" />
              <button type="button" className="toggle-password">
                <i className="fa-regular fa-eye"></i>
              </button>
            </div>
            <button type="button" onClick={() => setCurrentPage('register')}>Cadastrar</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            
            {error && <div className="error-message">{error}</div>}
            
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            
            <a href="#" onClick={(e) => { e.preventDefault(); setForgotModal(true); }}>Forget Your Password?</a>
            
            <button type="submit" className={`sign-in-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              <span className="btn-text">Entrar</span>
              <span className="spinner"></span>
            </button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <img src={logoImage} alt="Logo" className="toggle-logo" />
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="#" id="login" onClick={() => setIsActive(false)}>Login</button>
            </div>
            <div className="toggle-panel toggle-right">
              <img src={logoImage} alt="Logo" className="toggle-logo" />
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="#" id="register" onClick={() => setIsActive(true)}>Cadastar</button>
            </div>
          </div>
        </div>
      </div>

      <ForgotPasswordModal 
        isOpen={forgotModal} 
        onClose={() => setForgotModal(false)} 
      />
    </div>
  );
};

export default Login;