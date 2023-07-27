import React from 'react';
import { useState, useEffect } from 'react';
const linkedinLogo = require('../assets/linkedIn.svg');
const gitHubLogo = require('../assets/github.svg');
const logo = require('../assets/logo.png');

type PersonObj = {
  id: number;
  firstname: string;
  lastname: string;
  github: string;
  linkedin: string;
  photo: string;
};

const Contributors = () => {
  const [teamates, setTeamates] = useState([]);

  const team = async () => {
    let people = await fetch('http://localhost:3000/contributors', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await people.json();
    console.log(response, 'response contributors');
    setTeamates(response);
  };

  useEffect(() => {
    team();
  }, []);

  const teamatesInSvelte: JSX.Element[] = teamates.map((person: PersonObj) => {
    return (
      <div className='contributorBox'>
        <img
          src={logo}
          className='contributorPicture'
          width='90'
          height='90'
          alt='Contributor picture'
        />
        <h3>
          {person.firstname} {person.lastname}{' '}
        </h3>
        <p>Software Engineer</p>
        <a href={person.linkedin}>
          <img src={linkedinLogo} width='40' height='40' alt='LinkedIn Logo' />
        </a>
        <a href={person.github}>
          <img src={gitHubLogo} width='30' height='30' alt='LinkedIn Logo' />
        </a>
      </div>
    );
  });

  return <div className='contributors'>{teamatesInSvelte}</div>;
};

export default Contributors;
