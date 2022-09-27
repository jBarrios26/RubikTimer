import React from 'react';
import { NavBar } from '../../components';
import { Timer } from '../Timer';

const Home: React.FC = () => {
  return (
    <>
      <NavBar></NavBar>
      <Timer></Timer>
    </>
  );
};

export default Home;
