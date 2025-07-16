// src/components/AddAdForm.tsx
import { useState } from 'react';
import axios from 'axios';

const AddAdForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [position, setPosition] = useState<'header' | 'content' | 'footer'>('content');
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const newAd = {
      imageUrl,
      linkUrl,
      position,
      isActive,
      startDate: startDate || null,
      endDate: endDate || null,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/ad/add', newAd);
      setMessage('✅ Ad added successfully!');
      console.log('Created ad:', res.data);
      // Reset form
      setImageUrl('');
      setLinkUrl('');
      setPosition('content');
      setIsActive(true);
      setStartDate('');
      setEndDate('');
    } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('Unknown error:', err);
        }
        setMessage('❌ Failed to add ad.');
      }
      
      
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Add New Ad</h2>

      <div>
        <label className="block font-medium">Ad Image URL:</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/banner.jpg"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Target Link:</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https://destination.com"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Position:</label>
        <select
          className="w-full border rounded p-2"
          value={position}
          onChange={(e) => setPosition(e.target.value as 'header' | 'content' | 'footer')}
        >
          <option value="header">Header</option>
          <option value="content">Content</option>
          <option value="footer">Footer</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Start Date (optional):</label>
        <input
          type="date"
          className="w-full border rounded p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">End Date (optional):</label>
        <input
          type="date"
          className="w-full border rounded p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        <label className="font-medium">Is Active</label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Add Ad
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
};

export default AddAdForm;
