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
    <div>
      <h3>Contributors</h3>
    </div>
  );
};

export default Contributors;
