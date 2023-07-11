import React from 'react';

const Contributors = () => {
  const team = async () => {
    let people = await fetch('/contributors', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    let response = people.json();
    console.log(response);
  };
  team();
  return (
    <div className="contributors">
      <h1>Contributors</h1>
    </div>
  );
};

export default Contributors;
