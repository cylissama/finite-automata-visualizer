// app/form/page.js
'use client';

import React, { useState } from 'react';

export default function FormPage() {
  const [tableData, setTableData] = useState([
    { col1: '', col2: '', col3: '' },
    { col1: '', col2: '', col3: '' }
  ]);
  const [formName, setFormName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Add a new row to the table
  const addRow = () => {
    setTableData([...tableData, { col1: '', col2: '', col3: '' }]);
  };

  // Remove a specific row from the table
  const removeRow = (index) => {
    if (tableData.length > 1) {
      const newData = [...tableData];
      newData.splice(index, 1);
      setTableData(newData);
    }
  };

  // Handle input changes
  const handleInputChange = (index, column, value) => {
    const newData = [...tableData];
    newData[index][column] = value;
    setTableData(newData);
  };

  // Handle form name change
  const handleNameChange = (e) => {
    setFormName(e.target.value);
  };

  // Save form data to database
  const saveFormData = async () => {
    if (tableData.some(row => !row.col1 || !row.col2 || !row.col3)) {
      setSaveStatus('Please fill all fields before saving');
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus('Saving...');
      
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formName || 'Untitled Form',
          data: tableData
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSaveStatus('Form saved successfully!');
        setFormSubmitted(true);
      } else {
        setSaveStatus(`Error: ${result.error || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Error saving form:', error);
      setSaveStatus('Error saving form. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    saveFormData();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Table Input Form</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Form Name (optional)</label>
          <input
            type="text"
            value={formName}
            onChange={handleNameChange}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter a name for this form"
          />
          
          <div className="flex flex-row mb-2">
            <div className="flex-1 font-medium">Column 1</div>
            <div className="flex-1 font-medium">Column 2</div>
            <div className="flex-1 font-medium">Column 3</div>
            <div className="w-10"></div>
          </div>

          {tableData.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row mb-2">
              <div className="flex-1 pr-2">
                <input
                  type="text"
                  value={row.col1}
                  onChange={(e) => handleInputChange(rowIndex, 'col1', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex-1 px-2">
                <input
                  type="text"
                  value={row.col2}
                  onChange={(e) => handleInputChange(rowIndex, 'col2', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex-1 pl-2">
                <input
                  type="text"
                  value={row.col3}
                  onChange={(e) => handleInputChange(rowIndex, 'col3', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="w-10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeRow(rowIndex)}
                  className="text-red-500 hover:text-red-700"
                  disabled={tableData.length <= 1}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-4 mb-6">
          <button
            type="button"
            onClick={addRow}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Row
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Form'}
          </button>
        </div>
        
        {saveStatus && (
          <div className={`mt-2 p-2 rounded ${saveStatus.includes('Error') 
            ? 'bg-red-100 text-red-700' 
            : (saveStatus.includes('successfully') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700')}`}>
            {saveStatus}
          </div>
        )}
      </form>

      {formSubmitted && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <h2 className="text-xl font-semibold mb-2">Form Saved</h2>
          <p className="mb-2">Your table data has been saved to the database:</p>
          <pre className="bg-gray-100 p-3 rounded">
            {JSON.stringify(tableData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}