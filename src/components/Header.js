import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Home, LogOut } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
      <Link to="/" className="font-bold text-blue-600 text-xl flex items-center gap-2">
        <Shield size={20}/> VOTUM
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-gray-600"><Home size={20}/></Link>
        {user ? (
          <>
            <Link to="/dashboard" className="text-xs font-bold text-blue-600">AUDITORIA</Link>
            <button onClick={logout} className="text-red-500"><LogOut size={20}/></button>
          </>
        ) : (
          <Link to="/login" className="text-xs font-bold bg-gray-100 px-3 py-1 rounded">ADMIN</Link>
        )}
      </div>
    </nav>
  );
}