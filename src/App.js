import React from 'react';
import './App.css';


import Nav from './Components/Nav'
// import Footer from './Components/Pages/footer';
import ScrollToTop from './Components/Pages/ScrollToTop';

import Home from './Components/Pages/Home'



import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  
  return (
    <Router>
    <div>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>


      </Routes>
      {/* <Footer /> */}
    </div>
    </Router>
  );
}


export default App;
