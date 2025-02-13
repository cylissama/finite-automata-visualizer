"use client";

import { useState } from 'react';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';
import State from '../../components/state';
import Table from '../../components/table';

export default function Home() {
  const [states, setStates] = useState('');
  const [transitions, setTransitions] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Map to count arrow occurrences.
  const arrowCounts = new Map();

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
    console.log("States:", states);
    console.log("Transitions:", transitions);
  };

  // Calculate initial positions so nodes don't overlap.
  const stateArray = states.split(',').map((s) => s.trim()).filter(Boolean);
  
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
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Transitions</h2>
          <Table
            states={states}
            transitions={transitions}
            handleTransitionChange={handleTransitionChange}
          />
        </div>
      )}
      {/* Container for draggable state nodes. Using relative positioning */}
      <div className="relative w-full h-[600px]">
        {stateArray.map((state, index) => {
          // Spread nodes out using index for initial positions.
          const defaultX = (index % 4) * 200; 
          const defaultY = Math.floor(index / 4) * 150;
          return (
            <Draggable key={state} defaultPosition={{ x: defaultX, y: defaultY }}>
              <div id={state} className="absolute">
                <State name={state} isFinal={false} />
              </div>
            </Draggable>
          );
        })}
      </div>
      {/* Render arrows after the nodes */}
      {Object.keys(transitions).map((state) =>
        Object.keys(transitions[state]).map((symbol) => {
          const start = state.trim();
          const ends = transitions[state][symbol]
            ?.split(',')
            .map((end) => end.trim());
          return ends?.map((end) => {
            const arrowKey = `${start}-${end}-${symbol}`;
            const count = arrowCounts.get(arrowKey) || 0;
            arrowCounts.set(arrowKey, count + 1);
            const curveness = (count + 1) % 2 === 1 ? 0.5 : -0.5;
            return (
              <Xarrow
                key={arrowKey + "-" + count}
                start={start}
                end={end}
                label={symbol}
                curveness={curveness}
              />
            );
          });
        })
      )}
    </div>
  );
}