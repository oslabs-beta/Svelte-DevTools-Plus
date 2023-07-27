import React from 'react';
const linkedIn = require('../assets/linkedIn.svg');

const Mvps = () => {
  return (
    <div>
      <div className='mvps'>
        <h2>Contributor</h2>
        <p>
          <strong>Feature 1!</strong> A feature store is an emerging,
          ML-specific data system used to centralize storage, processing, and
          access to frequently used features, making them available for reuse in
          the development of future machine learning models.
        </p>
        <img
          src={linkedIn}
          className='feature 1'
          width='400'
          height='400'
          alt='Contributor picture'
        />
      </div>
      <div className='mvps'>
        <img
          src={linkedIn}
          className='feature 2'
          width='400'
          height='400'
          alt='Contributor picture'
        />
        <p>
          <strong>Feature 2!</strong> A feature store is an emerging,
          ML-specific data system used to centralize storage, processing, and
          access to frequently used features, making them available for reuse in
          the development of future machine learning models.
        </p>
      </div>
      <div className='mvps'>
        <p>
          <strong>Feature 3!</strong> A feature store is an emerging,
          ML-specific data system used to centralize storage, processing, and
          access to frequently used features, making them available for reuse in
          the development of future machine learning models.
        </p>
        <img
          src={linkedIn}
          className='feature 3'
          width='400'
          height='400'
          alt='Contributor picture'
        />
      </div>
    </div>
  );
};

export default Mvps;
