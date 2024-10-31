import React, { useEffect, useState } from 'react'
import "../CSS/home.css";
import { Link } from 'react-router-dom';
import { 
  FaPiggyBank,
  FaHandshake,
  FaGraduationCap,
  FaIcons,
  FaHollyBerry,
  FaGamepad,
  FaCartPlus,
  FaGlasses,
  FaUserGraduate,
  FaBullhorn,
  FaCheckCircle,
  FaArrowCircleRight,
  FaAngleDoubleRight,
  FaSearch 
} from 'react-icons/fa';
import axios from 'axios';
import WorldMap from './WorldMap';
import CountryFlag from './CountryFlag';
import { MainDataLoad } from './MainDataContext';




const Home = () => {
  const { 
    createTDUAccount, 
    setCreateTDUAccount,
    loginTDUAccount, 
    setLoginTDUAccount,
    pickedCountryModal, 
    setPickedCountryModal,
    pickedCountry, 
    setPickedCountry,
    countryData
  } = MainDataLoad(); 
  const [hasScrolled, setHasScrolled] = useState(false);

  console.log(countryData);
  


  return (
    <div className='mainContainer home'>
      <section className="mainContainerPage top">
        <div className="mainContentPage top1">
          <h3>THE DAILY UNIVERSE</h3>
          <h6>Your Gateway to Global News, Travel Guides, and Visa Information</h6>
        </div>
        <div className="mainContentPage top2">
          <div className="mncntntpt2 left">
            <h4>CHECK WORLD HAPPENINGS TODAY</h4>
            <p>Stay Updated on World Events - Explore Happenings and Destinations Across Every Country</p>
            <div className="mncntntpt2lBreakingNews">
              <h5>BREAKING NEWS</h5>
              <div className="mncntntpt2lbn">
                <div className="mncntntpt2lbnContent">
                  <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                </div>
                <div className="mncntntpt2lbnContent">
                  <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                </div>
                <div className="mncntntpt2lbnContent">
                  <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                </div>
                <div className="mncntntpt2lbnContent">
                  <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="mncntntpt2 right">
            {(pickedCountryModal && pickedCountry) && <div className="mncntntpt2rSelected">
              <div className="mncntntpt2rsCountryName">
                <h5>{pickedCountry} <br /><span>{countryData?.name?.official}</span> </h5>
                <div>
                  <CountryFlag countryName={`${pickedCountry}`} />
                </div>
              </div>
            </div>}
            <div className="mncntntpt2rSearch">
              <input type="text" placeholder='Search Country here..'/>
              <h6><FaSearch /></h6>
            </div>
            <WorldMap />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;