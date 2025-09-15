// client/src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import JournalPage from './pages/JournalPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './index.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="dark bg-slate-900 text-slate-300 min-h-screen font-sans">
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/" 
            element={token ? <JournalPage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;