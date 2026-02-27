import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from "../../lib/supabase";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const success = await login(email, password);

  if (success) {
    navigate('/admin');
  } else {
    setError('Invalid email or password.');
  }
};

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center space-x-2 text-neutral-400 hover:text-primary transition-colors mb-8 font-bold text-sm">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-xl overflow-hidden"
        >
          <div className="p-12">
            <h1 className="text-3xl font-black mb-2">Admin Access</h1>
            <p className="text-neutral-500 mb-8">Enter your credentials to continue.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center space-x-3 text-sm font-medium border border-red-100">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email</label>
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Password</label>
                <input 
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
              
              <button type="submit" className="btn-primary w-full py-4">
                Login
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
