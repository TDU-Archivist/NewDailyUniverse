import React from 'react';
import './App.css';


import Nav from './Components/Nav'
// import Footer from './Components/Pages/footer';
import ScrollToTop from './Components/Pages/ScrollToTop';


import { MainDataLoadProvider } from './Components/Pages/MainDataContext';
import Home from './Components/Pages/Home'
import AdminPanel from './Components/Pages/AdminPanel';
import Profile from './Components/Pages/Profile';


import ArticlePage from './Components/Pages/ArticlePage';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const StoredUserData = localStorage.getItem('tduProfileAccount')
  const StoredUserDataJSON = JSON.parse(StoredUserData)
  
  return (
    <MainDataLoadProvider>
      <Router>
      <div>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}/>

          {(StoredUserData) && <Route path={`/${StoredUserDataJSON?.username}`} element={<Profile/>}/>}
          {(StoredUserDataJSON?.state === 'Admin') && <Route path="/AdminPanel" element={<AdminPanel/>}/>}


          <Route path="/News/:newsCanonical" element={<ArticlePage/>}/>

          
          <Route path="*" element={<Home/>}/>
        </Routes>
        {/* <Footer /> */}
      </div>
      </Router>
    </MainDataLoadProvider>
  );
}


export default App;
