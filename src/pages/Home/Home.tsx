import React from 'react';
import { NavBar } from '../../components';
import { Timer } from '../Timer';

const Home: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar></NavBar>
      <Timer></Timer>
    </div>
  );
};

export default Home;
