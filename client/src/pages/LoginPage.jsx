import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error(err.response.data);
      alert('Login Failed');
    }
  };

  return (
    // This div correctly centers the content on the page
    <div className="flex items-center justify-center min-h-screen">
      
      {/* UPDATED CARD STYLING:
        - bg-slate-800: A slightly lighter dark color for the card.
        - shadow-xl: A larger shadow effect.
        - shadow-indigo-500/20: This is the GLOW. It adds a semi-transparent indigo-colored shadow.
      */}
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-xl shadow-xl shadow-indigo-500/20">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={onChange}
              required
              // UPDATED INPUT STYLING FOR DARK MODE
              className="w-full px-3 py-2 mt-1 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-400">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={onChange}
              required
              className="w-full px-3 py-2 mt-1 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;