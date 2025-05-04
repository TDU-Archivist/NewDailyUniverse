import React, { useEffect, useState } from 'react'
import "../CSS/newspapers.css";
import { Link } from 'react-router-dom';
import { 
  FaTimes,
  FaSearch,
  FaMicrophone,
  FaExternalLinkAlt,
  FaArrowRight,
  FaArrowLeft,
  FaMapMarkedAlt,
  FaBook,
  FaPlayCircle     
} from 'react-icons/fa';
import { 
  TbArrowsMinimize,
  TbArrowsMaximize 
} from "react-icons/tb";
import { 
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";
import axios from 'axios';
import WorldMap from './WorldMap';
import MapViewer from './MapViewer';
import MapboxMap from './Mapbox';
import CountryFlag from './CountryFlag';
import ExchangeRateMarquee from './ExchangeRateMarquee';
import { MainDataLoad } from './MainDataContext';



const TextSlicer = ({ text = '', maxLength }) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return (
      <>{truncatedText}</>
    );
};
const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
      return '';
    }
  
    const truncateDecimal = (value, decimals) => {
      const factor = Math.pow(10, decimals);
      return Math.floor(value * factor) / factor;
    };
  
    if (num >= 1_000_000_000) {
      return truncateDecimal(num / 1_000_000_000, 1) + 'B';
    } else if (num >= 1_000_000) {
      return truncateDecimal(num / 1_000_000, 1) + 'M';
    } else if (num >= 100_000) {
      return truncateDecimal(num / 1_000, 1) + 'K';
    }
    
    return num.toString();
};
const NumberFormatter = ({ number }) => {
    return <>{number > 0 ? formatNumber(number) : 0}</>;
};

const Newspapers = () => {
    const { 
        webLoader,
        createTDUAccount, 
        setCreateTDUAccount,
        loginTDUAccount, 
        setLoginTDUAccount,
        pickedCountryModal, 
        setPickedCountryModal,
        pickedCountry, 
        setPickedCountry,
        clickedCountry, 
        setClickedCountry,
        countryData,
        countryDescription, 
        setCountryDescription,
        countryCurrency,
        countryThreeTouristSpots,
        switchFullMap, 
        setSwitchFullMap,
        openSuggestedMapTopic, 
        setOpenSuggestedMapTopic,
        fullMapPickedCountry, 
        setFullMapPickedCountry,
        viewAllCapitals,
        viewPickCapital, 
        setViewPickCapital,
        viewCountryCapital, 
        setViewCountryCapital,
        exchangeRates,
        viewAllArticles,
        data,
        dataList,
    } = MainDataLoad(); 

    const webLogoProxy = process.env.REACT_APP_WEBLOGO_PROXY;
    const [thumbnails, setThumbnails] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
        
    const filteredNewspapers = dataList?.viewAllNewspapers?.filter((newspaper) =>
      newspaper.newspaper_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newspaper.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newspaper.newspaper_category.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    useEffect(() => {
      const fetchThumbnails = async () => {
          const newThumbnails = {};
  
          await Promise.all(
            filteredNewspapers?.map(async (details) => {
                  try {
                      const response = await axios.get(
                          `${webLogoProxy}?url=${encodeURIComponent(details?.newspaper_website)}`
                      );
  
                      // Ensure the response is valid
                      if (response.data.image && response.data.image !== "No image found") {
                          newThumbnails[details?.newspaper_website] = response.data.image;
                      } else {
                          // newThumbnails[details?.magazine_website] = defaultImage;
                      }
                  } catch (error) {
                      // Don't fetch the image if there's an error
                      // newThumbnails[details?.magazine_website] = defaultImage;
                  }
              })
          );
  
          setThumbnails(newThumbnails);
      };
  
      if (filteredNewspapers?.length) {
        fetchThumbnails();
      }
    }, [filteredNewspapers]);


    return (
        <div className='mainContainer newspapers'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>
            
            <section className="newspapersContainerPage top">
              {/* <div className="newspapersContentPage top1">
                  <img src={require('../assets/imgs/NewspaperBG.png')} alt="" />
              </div> */}
              <div className="newspapersContentPage top2">
                  <div className="nwspprcpt2 left">
                    <h3>NEWSPAPERS</h3>
                    <h5>NEWSPAPERS AROUND THE WORLD BY CATEGORY</h5>
                    {/* <p>Stay Informed in traditional reading like before, checkout everyday's edition here.</p> */}
                  </div>
                  <div className="nwspprcpt2 right">
                      <input type="text" placeholder='Search keyword, article or topic here...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                      <div className="nwspprcpt2rBtn">
                          <button><FaSearch className='faIcons'/></button>
                          <button><FaMicrophone className='faIcons'/></button>
                      </div>
                  </div>
              </div><hr />
            </section>

            <section className="newspapersContainerPage mid">
              {(searchTerm && filteredNewspapers.length > 0) ? <>
                <div className="newspaperCatContentPage mid1">
                  {filteredNewspapers?.map((details, i) => (
                    <a key={i} href={details?.newspaper_website} target="_blank" rel="noopener noreferrer">
                      <div className='nwspprctcpm2Img'>
                        <img src={`https://flagcdn.com/w320/${(details?.country).toLowerCase()}.png`} alt="" id="nwspprctcpm2iFlag" />
                        <img id='nwspprctcpm2iLogo' src={thumbnails[details?.newspaper_website]} alt='' />
                      </div>
                      <div className='nwspprctccpm2Dets'>
                        <h6>{details?.newspaper_name}</h6>
                        <p>{details?.newspaper_description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </>:<>
                <div className="newspapersContentPage mid1">
                  <Link className="nwspprcm1" to='/Newspapers/AlternativeNewspaper'>
                    <div className='nwspprcpm1Img'>
                      <img src={require('../assets/imgs/Newspaper/00.AltNewspaper.png')} alt="" />
                    </div>
                    <div className='nwspprcm1Content'>
                      <h5>ALTERNATIVE NEWSPAPER</h5>
                      <p>Find the most interesting issues, hot topics and breakings news. Read the the latest daily news from the list of Alternative Newspapers around the world!</p>
                    </div>
                  </Link>
                  <Link className="nwspprcm1" to='/Newspapers/CollegeNewspaper'>
                    <div className='nwspprcpm1Img'>
                      <img src={require('../assets/imgs/Newspaper/00.CollegeNewspaper.png')} alt="" />
                    </div>
                    <div className='nwspprcm1Content'>
                      <h5>COLLEGE NEWSPAPER</h5>
                      <p>The list of student newspapers (College Newspapers and University Newspapers) from the best colleges and universities around the world.</p>
                    </div>
                  </Link>
                  <Link className="nwspprcm1" to='/Newspapers/LocalCountryNewspaper'>
                    <div className='nwspprcpm1Img'>
                      <img src={require('../assets/imgs/Newspaper/00.LocalNewspaper.png')} alt="" />
                    </div>
                    <div className='nwspprcm1Content'>
                      <h5>LOCAL COUNTRY NEWSPAPER</h5>
                      <p>Get the latest news today! Find thousands of online newspapers from around the world. All newspapers are carefully sorted by region, country, and state.</p>
                    </div>
                  </Link>
                  <Link className="nwspprcm1" to='/Newspapers/WorldNewspaper'>
                    <div className='nwspprcpm1Img'>
                      <img src={require('../assets/imgs/Newspaper/00.WorldNewspaper.png')} alt="" />
                    </div>
                    <div className='nwspprcm1Content'>
                      <h5>WORLD NEWSPAPER</h5>
                      <p>Check the list of real-time news from World Newspapers Online. We cover news on politics, society, culture, sport, travel, and more. Learn more.</p>
                    </div>
                  </Link>
                </div>
              </>}
            </section>



            
        </div>
    )
}

export default Newspapers