import React, { useState, useEffect, useRef } from 'react';
import './Register.css';
import { supabase } from '../supabaseClient';
import logoImage from '../logo_fsjpii.jpg';

const Register = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(true);

  const registerCardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (registerCardRef.current && !registerCardRef.current.contains(e.target)) {
        setCurrentPage('home');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setCurrentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    if (!acceptTerms) {
      setError('Você precisa aceitar os termos de uso');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nome: formData.nome,
          }
        }
      });

      if (error) throw error;
      
      alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar.');
      setCurrentPage('login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className={`container ${isActive ? 'active' : ''}`} id="container" ref={registerCardRef}>
        <button className="modal-close" onClick={() => setCurrentPage('home')}>×</button>
        
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registeration</span>
            
            {error && <div className="error-message">{error}</div>}
            
            <input
              type="text"
              placeholder="Name"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
            />
            
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
            
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span>I accept the terms of use</span>
            </label>
            
            <button type="submit" className={`sign-up-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              <span className="btn-text">Cadastrar</span>
              <span className="spinner"></span>
            </button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <div className="password-wrapper">
              <input type="password" placeholder="Password" />
              <button type="button" className="toggle-password">
                <i className="fa-regular fa-eye"></i>
              </button>
            </div>
            <a href="#">Forget Your Password?</a>
            <button type="button" onClick={() => setCurrentPage('login')}>Sign In</button>
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
              <button className="#" id="register" onClick={() => setIsActive(true)}>Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;