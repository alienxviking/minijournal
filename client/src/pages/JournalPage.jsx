import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { DatePicker } from '@/components/DatePicker';

const API_URL = 'http://localhost:5001/api/entries';

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const navigate = useNavigate();
  
  // Simplified state for the new date picker
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios.defaults.headers.common['x-auth-token'] = token;
    fetchEntries();
  }, [navigate]);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL);
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    await axios.post(API_URL, { date, content });
    setContent('');
    fetchEntries();
    toast.success('Entry created successfully!');
  };

  const deleteEntry = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      await axios.delete(`${API_URL}/${id}`);
      fetchEntries();
      toast.success('Entry deleted!');
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditText(entry.content);
  };

  const handleUpdate = async (id) => {
    await axios.patch(`${API_URL}/${id}`, { content: editText });
    setEditingId(null);
    setEditText('');
    fetchEntries();
    toast.success('Entry updated!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">MiniJournal 📔</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold rounded-md shadow-sm"
        >
          Logout
        </button>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl shadow-xl shadow-indigo-500/20 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold text-white">New Entry</h3>
          <div>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div>
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm"
          >
            Add Entry
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Your Entries</h2>
        {isLoading ? (
          <p className="text-slate-400">Loading entries...</p>
        ) : entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry._id} className="bg-slate-800 p-5 rounded-xl shadow-lg shadow-indigo-500/10 transition hover:shadow-indigo-500/20">
               {editingId === entry._id ? (
                 <div className="space-y-3">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="flex space-x-2">
                      <button onClick={() => handleUpdate(entry._id)} className="py-1 px-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-md">Save</button>
                      <button onClick={() => setEditingId(null)} className="py-1 px-3 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-md">Cancel</button>
                    </div>
                 </div>
               ) : (
                 <div className="flex justify-between items-start">
                   <div>
                     <p className="text-sm font-medium text-gray-400">{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                     <p className="mt-2 text-slate-300 whitespace-pre-wrap">{entry.content}</p>
                   </div>
                   <div className="flex space-x-3 flex-shrink-0 ml-4">
                     <button onClick={() => handleEdit(entry)} className="font-medium text-sm text-yellow-500 hover:text-yellow-400">Edit</button>
                     <button onClick={() => deleteEntry(entry._id)} className="font-medium text-sm text-red-500 hover:text-red-400">Delete</button>
                   </div>
                 </div>
               )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
             <p className="text-slate-400">No entries yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;