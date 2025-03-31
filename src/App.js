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

import Airlines from './Components/Pages/Airlines';
import Airports from './Components/Pages/Airports';
import BreakingNews from './Components/Pages/BreakingNews';
import GlobalInfo from './Components/Pages/GlobalInfo';
import NewsChannels from './Components/Pages/NewsChannels';
import Magazine from './Components/Pages/Magazine';
import Newspapers from './Components/Pages/Newspapers';
import Restaurants from './Components/Pages/Restaurants';
import Sports from './Components/Pages/Sports';



import AirlineContinent from './Components/Pages/AirlineContinent';



import MagazineCategory from './Components/Pages/MagazineCategory';
import NewspaperCategory from './Components/Pages/NewspaperCategory';
import NewspaperContinent from './Components/Pages/NewspaperContinent';
import RestaurantCategory from './Components/Pages/RestaurantCategory';
import RestaurantContinent from './Components/Pages/RestaurantContinent';


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


          <Route path="/Airlines" element={<Airlines/>}/>
          <Route path="/Airports" element={<Airports/>}/>
          <Route path="/BreakingNews" element={<BreakingNews/>}/>
          <Route path="/GlobalInfo" element={<GlobalInfo/>}/>
          <Route path="/NewsChannels" element={<NewsChannels/>}/>
          <Route path="/Magazines" element={<Magazine/>}/>
          <Route path="/Newspapers" element={<Newspapers/>}/>
          <Route path="/Restaurants" element={<Restaurants/>}/>
          <Route path="/Sports" element={<Sports/>}/>

          
          <Route path="/Airlines/Continent/:airlineContinent" element={<AirlineContinent/>}/>


          <Route path="/Magazines/:magazineCategory" element={<MagazineCategory/>}/>
          <Route path="/Newspapers/:newspaperCategory" element={<NewspaperCategory/>}/>
          <Route path="/Newspapers/Continent/:newspaperContinent" element={<NewspaperContinent/>}/>
          <Route path="/Restaurants/:restaurantCategory" element={<RestaurantCategory/>}/>
          <Route path="/Restaurants/Continent/:restaurantContinent" element={<RestaurantContinent/>}/>

          <Route path="*" element={<Home/>}/>
        </Routes>
        {/* <Footer /> */}
      </div>
      </Router>
    </MainDataLoadProvider>
  );
}


export default App;
