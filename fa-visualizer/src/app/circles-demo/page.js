// app/circles-demo/page.js
'use client';

import React, { useState } from 'react';
import TextCircle from '../../../components/TextCircle';

export default function CirclesDemo() {
  // Sample data for circles
  const initialCircles = [
    { id: 1, text: 'One', size: 100, x: 50, y: 50, color: '#3B82F6' },
    { id: 2, text: 'Two', size: 80, x: 200, y: 120, color: '#10B981' },
    { id: 3, text: 'Three', size: 120, x: 100, y: 250, color: '#EC4899' }
  ];

  const [circles, setCircles] = useState(initialCircles);
  const [newCircle, setNewCircle] = useState({
    text: '',
    size: 100,
    x: 0,
    y: 0,
    color: '#6366F1'
  });

  // Add a new circle
  const addCircle = () => {
    if (newCircle.text.trim()) {
      setCircles([
        ...circles,
        {
          id: Date.now(),
          text: newCircle.text,
          size: newCircle.size,
          x: newCircle.x,
          y: newCircle.y,
          color: newCircle.color
        }
      ]);
      // Reset text but keep other properties
      setNewCircle({ ...newCircle, text: '' });
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCircle({
      ...newCircle,
      [name]: name === 'text' ? value : Number(value)
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Text Circles Demo</h1>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Add New Circle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1">Text</label>
            <input
              type="text"
              name="text"
              value={newCircle.text}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter text"
            />
          </div>
          <div>
            <label className="block mb-1">Size (px)</label>
            <input
              type="number"
              name="size"
              value={newCircle.size}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="20"
              max="300"
            />
          </div>
          <div>
            <label className="block mb-1">Color</label>
            <input
              type="color"
              name="color"
              value={newCircle.color}
              onChange={(e) => setNewCircle({ ...newCircle, color: e.target.value })}
              className="w-full p-1 border rounded h-10"
            />
          </div>
          <div>
            <label className="block mb-1">X Position (px)</label>
            <input
              type="number"
              name="x"
              value={newCircle.x}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-1">Y Position (px)</label>
            <input
              type="number"
              name="y"
              value={newCircle.y}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
        </div>
        <button
          onClick={addCircle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!newCircle.text.trim()}
        >
          Add Circle
        </button>
      </div>

      <div className="relative border border-gray-300 rounded h-96 mb-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 text-center text-sm pt-1">
          Canvas Area (Circles will be positioned here)
        </div>
        <div className="w-full h-full pt-8 relative">
          {circles.map((circle) => (
            <TextCircle
              key={circle.id}
              text={circle.text}
              size={circle.size}
              backgroundColor={circle.color}
              x={circle.x}
              y={circle.y}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded border">
        <h2 className="text-lg font-semibold mb-3">Current Circles</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Text</th>
              <th className="p-2 text-left">Size</th>
              <th className="p-2 text-left">Position (X, Y)</th>
              <th className="p-2 text-left">Color</th>
            </tr>
          </thead>
          <tbody>
            {circles.map((circle) => (
              <tr key={circle.id} className="border-t">
                <td className="p-2">{circle.text}</td>
                <td className="p-2">{circle.size}px</td>
                <td className="p-2">({circle.x}, {circle.y})</td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div
                      className="w-6 h-6 rounded mr-2"
                      style={{ backgroundColor: circle.color }}
                    ></div>
                    {circle.color}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}