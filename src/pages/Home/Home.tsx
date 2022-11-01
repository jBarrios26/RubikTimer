import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components';
import { Timer } from '../Timer';

const Home: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar></NavBar>
      <Outlet />
    </div>
  );
};

export default Home;
