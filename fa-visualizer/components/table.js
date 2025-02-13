import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ states, transitions, handleTransitionChange }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">State</th>
          <th className="py-2 px-4 border-b">Transition for 'a'</th>
          <th className="py-2 px-4 border-b">Transition for 'b'</th>
        </tr>
      </thead>
      <tbody>
        {states.split(',').map((state) => (
          <tr key={state.trim()}>
            <td className="py-2 px-4 border-b">{state.trim()}</td>
            <td className="py-2 px-4 border-b">
              <input
                type="text"
                value={transitions[state.trim()]?.a || ''}
                onChange={(e) => handleTransitionChange(state.trim(), 'a', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </td>
            <td className="py-2 px-4 border-b">
              <input
                type="text"
                value={transitions[state.trim()]?.b || ''}
                onChange={(e) => handleTransitionChange(state.trim(), 'b', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  states: PropTypes.string.isRequired,
  transitions: PropTypes.object.isRequired,
  handleTransitionChange: PropTypes.func.isRequired,
};

export default Table;