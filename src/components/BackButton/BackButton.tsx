import { Link } from 'react-router-dom';
import './BackButton.scss';
import React from 'react';

export const BackButton: React.FC = () => {
  return (
    <div className="back">
      <Link to=".." relative="path" className="back__wrapper">
        <div className="back__arrow" />
        Back
      </Link>
    </div>
  );
};
