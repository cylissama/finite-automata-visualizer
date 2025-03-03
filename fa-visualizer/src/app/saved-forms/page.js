// app/saved-forms/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SavedFormsPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  // Fetch all saved forms
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/forms');
        if (!response.ok) {
          throw new Error('Failed to fetch forms');
        }
        
        const data = await response.json();
        setForms(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  // Fetch a specific form's data
  const viewFormDetails = async (id) => {
    try {
      const response = await fetch(`/api/forms/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch form details');
      }
      
      const data = await response.json();
      setSelectedForm(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading saved forms...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Forms</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-1">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
            
            {forms.length === 0 ? (
              <p className="text-gray-500">No forms saved yet.</p>
            ) : (
              <ul className="divide-y">
                {forms.map(form => (
                  <li key={form.id} className="py-3">
                    <button 
                      onClick={() => viewFormDetails(form.id)}
                      className="text-left w-full hover:bg-gray-50 p-2 rounded"
                    >
                      <div className="font-medium">{form.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(form.createdAt).toLocaleString()}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-4">
              <Link 
                href="/form" 
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create New Form
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          {selectedForm ? (
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">{selectedForm.name}</h2>
              <p className="text-sm text-gray-500 mb-4">
                Created on {new Date(selectedForm.createdAt).toLocaleString()}
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b">Column 1</th>
                      <th className="py-2 px-4 border-b">Column 2</th>
                      <th className="py-2 px-4 border-b">Column 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {JSON.parse(selectedForm.data).map((row, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{row.col1}</td>
                        <td className="py-2 px-4 border-b">{row.col2}</td>
                        <td className="py-2 px-4 border-b">{row.col3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
              Select a form to view its details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}