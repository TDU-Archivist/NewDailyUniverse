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
import WorldMap from './WorldMap';

const Home = () => {
  const [hasScrolled, setHasScrolled] = useState(false);




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
          </div>
          <div className="mncntntpt2 right">
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