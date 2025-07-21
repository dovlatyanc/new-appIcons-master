
import React from 'react';

function getTileColor(value) {
  const colors = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
  };
  return colors[value] || '#3e3933';
}

const Tile = ({ value }) => {
  if (value === 0) return null;

  const tileStyle = {
    backgroundColor: getTileColor(value),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
    margin: '5px',
    borderRadius: '8px',
  };

  return <div style={tileStyle}>{value}</div>;
};



export default Tile;