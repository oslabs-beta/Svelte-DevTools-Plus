import React from 'react';
const linkedIn = require('../assets/linkedIn.svg');

const Instructions = () => {
  return (
    <div className='instructions'>
      <h2>Features</h2>
      <img
        src={linkedIn}
        className='contributorPicture'
        width='400'
        height='400'
        alt='Contributor picture'
      />
      <p>
        An instruction is something that someone tells you to do. Two lawyers
        were told not to leave the building but no reason for this instruction
        was given. Synonyms: order, ruling, command, rule More Synonyms of
        instruction. 2. uncountable noun.
      </p>
    </div>
  );
};

export default Instructions;
