// app/form/page.js
'use client';

import React, { useState } from 'react';

export default function FormPage() {
  const [tableData, setTableData] = useState([
    { col1: '', col2: '', col3: '' },
    { col1: '', col2: '', col3: '' }
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', tableData);
    setFormSubmitted(true);
    
    // Here you would typically send this data to your backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Table Input Form</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
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
          >
            Submit
          </button>
        </div>
      </form>

      {formSubmitted && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <h2 className="text-xl font-semibold mb-2">Form Submitted</h2>
          <p className="mb-2">Your table data has been submitted:</p>
          <pre className="bg-gray-100 p-3 rounded">
            {JSON.stringify(tableData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}