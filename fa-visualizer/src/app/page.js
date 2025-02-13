"use client";

import { useState } from 'react';

export default function Home() {
  const [states, setStates] = useState('');
  const [transitions, setTransitions] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleStateChange = (e) => {
    setStates(e.target.value);
  };

  const handleTransitionChange = (state, symbol, value) => {
    setTransitions((prev) => ({
      ...prev,
      [state]: {
        ...prev[state],
        [symbol]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('States:', states);
    console.log('Transitions:', transitions);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Finite Automata Visualizer!</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="states">
            States (comma-separated):
          </label>
          <input
            id="states"
            type="text"
            value={states}
            onChange={handleStateChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {states.split(',').map((state) => (
          <div key={state.trim()} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">State: {state.trim()}</h2>
            <div className="mb-2">
              <label className="block text-sm font-bold mb-1" htmlFor={`${state.trim()}-a`}>
                Transition for 'a':
              </label>
              <input
                id={`${state.trim()}-a`}
                type="text"
                onChange={(e) => handleTransitionChange(state.trim(), 'a', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-bold mb-1" htmlFor={`${state.trim()}-b`}>
                Transition for 'b':
              </label>
              <input
                id={`${state.trim()}-b`}
                type="text"
                onChange={(e) => handleTransitionChange(state.trim(), 'b', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      {submitted && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Transitions</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(transitions, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}