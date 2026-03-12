import React from 'react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="forgot-password-modal-overlay" onClick={onClose}>
      <div className="forgot-password-modal" onClick={(e) => e.stopPropagation()}>
        <button className="forgot-password-modal-close" onClick={onClose}>×</button>
        <h2>Recuperar Senha</h2>
        <p>Digite seu e-mail para receber instruções de recuperação de senha.</p>
        <input type="email" placeholder="Seu e-mail" />
        <button>Enviar</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;