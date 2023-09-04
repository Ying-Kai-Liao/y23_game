import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Game from './game/Game';

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <BrowserRouter basename="/Y23/game">
        {/* <AppBar />
        <FloatingButton /> */}
        <div className=' w-screen min-h-screen mt-14'>
          {/* <div className='fixed top-16 md:top-14 left-0 z-10 w-screen'>
            <MarqueeHeader />
          </div> */}
          <Routes>
            <Route path="/" element={<Game />}/>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
