import React from 'react';
import { useState, useEffect } from 'react';
const linkedinLogo = require('../assets/linkedIn.svg');
const gitHubLogo = require('../assets/github.svg');

type PersonObj = {
  id: number;
  firstname: string;
  lastname: string;
  github: string;
  linkedin: string;
};

const Contributors = () => {
  const [teamates, setTeamates] = useState([]);

  const team = async () => {
    let people = await fetch('http://localhost:3000/contributors', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await people.json();
    console.log(response);
    setTeamates(response);
  };

  useEffect(() => {
    team();
  }, []);

  const teamatesInSvelte: JSX.Element[] = teamates.map((person: PersonObj) => {
    return (
      <div>
        <h3>
          {person.firstname} {person.lastname}{' '}
        </h3>
        <p>Software Engineer</p>
        <a href={person.linkedin}>
          <img src={linkedinLogo} width="50" height="50" alt="LinkedIn Logo" />
          <img src={gitHubLogo} width="50" height="50" alt="LinkedIn Logo" />
        </a>
      </div>
    );
  });

  return (
    <div className="contributors">
      <h1>Contributors</h1>
      {teamatesInSvelte}
    </div>
  );
};

export default Contributors;
