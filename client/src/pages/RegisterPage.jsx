import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
      window.location.reload();
    } catch (err)      {
      console.error(err.response.data);
      alert('Registration Failed');
    }
  };

  return (
    // Main container: Centers the form vertically and horizontally
    <div className="flex items-center justify-center min-h-screen">
      
      {/* Form card: Dark theme with glow effect */}
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-xl shadow-xl shadow-indigo-500/20">
        <h2 className="text-2xl font-bold text-center text-white">Create an Account</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={onChange}
              required
              // Input styling for dark mode
              className="w-full px-3 py-2 mt-1 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={onChange}
              required
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
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;