import React from 'react';
import NabBur from './components/NabBur';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div>
      <NabBur></NabBur>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;