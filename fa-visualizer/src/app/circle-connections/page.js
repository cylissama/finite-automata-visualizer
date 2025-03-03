// app/circle-connections/page.js
'use client';

import React, { useState, useRef, useEffect } from 'react';
import TextCircle from '../../../components/TextCircle';
import Arrow from '../../../components/Arrow';

export default function CircleConnectionsPage() {
  // Store circles and connections
  const [circles, setCircles] = useState([
    { id: 'circle1', text: 'One', size: 100, x: 50, y: 50, color: '#3B82F6' },
    { id: 'circle2', text: 'Two', size: 80, x: 200, y: 120, color: '#10B981' },
    { id: 'circle3', text: 'Three', size: 120, x: 100, y: 250, color: '#EC4899' }
  ]);
  
  const [connections, setConnections] = useState([
    { id: 'conn1', from: 'circle1', to: 'circle2', color: '#333' }
  ]);

  const [selectedCircles, setSelectedCircles] = useState([]);
  const [newCircle, setNewCircle] = useState({
    text: '',
    size: 100,
    x: 0,
    y: 0,
    color: '#6366F1'
  });

  // Ref for the canvas area to get mouse positions
  const canvasRef = useRef(null);
  
  // Calculate connection coordinates
  const calculateConnectionPoints = () => {
    return connections.map(conn => {
      const fromCircle = circles.find(circle => circle.id === conn.from);
      const toCircle = circles.find(circle => circle.id === conn.to);
      
      if (!fromCircle || !toCircle) return null;
      
      // Calculate center points of circles
      const startX = fromCircle.x + fromCircle.size / 2;
      const startY = fromCircle.y + fromCircle.size / 2;
      const endX = toCircle.x + toCircle.size / 2;
      const endY = toCircle.y + toCircle.size / 2;
      
      return {
        ...conn,
        startX,
        startY,
        endX,
        endY
      };
    }).filter(conn => conn !== null);
  };

  // Handle circle selection
  const handleCircleClick = (circleId) => {
    if (selectedCircles.includes(circleId)) {
      // Deselect if already selected
      setSelectedCircles(selectedCircles.filter(id => id !== circleId));
    } else {
      // If we already have 2 selected, replace the first one
      if (selectedCircles.length >= 2) {
        setSelectedCircles([selectedCircles[1], circleId]);
      } else {
        // Add to selection
        setSelectedCircles([...selectedCircles, circleId]);
      }
    }
  };

  // Add a new circle
  const addCircle = () => {
    if (newCircle.text.trim()) {
      const newId = `circle${Date.now()}`;
      setCircles([
        ...circles,
        {
          id: newId,
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

  // Create a connection between selected circles
  const createConnection = () => {
    if (selectedCircles.length === 2) {
      // Check if connection already exists
      const connectionExists = connections.some(
        conn => conn.from === selectedCircles[0] && conn.to === selectedCircles[1]
      );
      
      if (!connectionExists) {
        const newId = `conn${Date.now()}`;
        setConnections([
          ...connections,
          {
            id: newId,
            from: selectedCircles[0],
            to: selectedCircles[1],
            color: '#333'
          }
        ]);
      }
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

  // Handle circle dragging
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCircle, setDraggedCircle] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDragging = (e, circle) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggedCircle(circle);
    setDragOffset({
      x: e.clientX - circle.x,
      y: e.clientY - circle.y
    });
  };

  const stopDragging = () => {
    setIsDragging(false);
    setDraggedCircle(null);
  };

  const handleCanvasMouseMove = (e) => {
    if (isDragging && draggedCircle && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      
      // Update circle position
      setCircles(circles.map(circle => 
        circle.id === draggedCircle.id ? { ...circle, x, y } : circle
      ));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Circle Connections Demo</h1>

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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          disabled={!newCircle.text.trim()}
        >
          Add Circle
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={createConnection}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mr-2"
          disabled={selectedCircles.length !== 2}
        >
          Connect Selected Circles
        </button>
        <button
          onClick={() => setSelectedCircles([])}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          disabled={selectedCircles.length === 0}
        >
          Clear Selection
        </button>
      </div>

      <div className="mb-2 text-sm text-gray-600">
        {selectedCircles.length === 0 ? (
          "Select two circles to create a connection"
        ) : selectedCircles.length === 1 ? (
          "Select one more circle to create a connection"
        ) : (
          `Connection: ${selectedCircles[0]} → ${selectedCircles[1]}`
        )}
      </div>

      <div 
        ref={canvasRef}
        className="relative border border-gray-300 rounded h-96 mb-6" 
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 text-center text-sm pt-1">
          Canvas Area (Click to select circles, drag to move them)
        </div>
        
        {/* Render arrows for connections */}
        {calculateConnectionPoints().map(conn => (
          <Arrow
            key={conn.id}
            startX={conn.startX}
            startY={conn.startY}
            endX={conn.endX}
            endY={conn.endY}
            color={conn.color}
          />
        ))}
        
        {/* Render circles */}
        <div className="w-full h-full pt-8 relative">
          {circles.map((circle) => (
            <div 
              key={circle.id}
              onMouseDown={(e) => startDragging(e, circle)}
            >
              <TextCircle
                id={circle.id}
                text={circle.text}
                size={circle.size}
                backgroundColor={circle.color}
                x={circle.x}
                y={circle.y}
                onClick={handleCircleClick}
                isSelected={selectedCircles.includes(circle.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded border">
          <h2 className="text-lg font-semibold mb-3">Circles</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Text</th>
                <th className="p-2 text-left">Position</th>
              </tr>
            </thead>
            <tbody>
              {circles.map((circle) => (
                <tr key={circle.id} className="border-t">
                  <td className="p-2">{circle.id}</td>
                  <td className="p-2">{circle.text}</td>
                  <td className="p-2">({circle.x}, {circle.y})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-4 rounded border">
          <h2 className="text-lg font-semibold mb-3">Connections</h2>
          {connections.length === 0 ? (
            <p>No connections yet</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">From</th>
                  <th className="p-2 text-left">To</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((conn) => (
                  <tr key={conn.id} className="border-t">
                    <td className="p-2">{conn.from}</td>
                    <td className="p-2">{conn.to}</td>
                    <td className="p-2">
                      <button
                        onClick={() => setConnections(connections.filter(c => c.id !== conn.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}