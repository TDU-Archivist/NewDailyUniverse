import React, { useEffect, useState } from 'react'
import "../CSS/magazine.css";
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
const Magazine = () => {
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

    const ArtMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Art Magazine").length
    const BoatMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Boat Magazine").length
    const BusinessMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Business Magazine").length
    const CarMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Car Magazine").length
    const ChildrensMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Children Magazine").length
    const ComputerMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Computer Magazine").length
    const CookingMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Cooking Magazine").length
    const CruiseMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Cruise Magazine").length
    const EducationMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Education Magazine").length
    const EntertainmentMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Entertainment Magazine").length
    const FashionMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Fashion Magazine").length
    const FinanceAndMoneyMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Finance and Money Magazine").length
    const HealthMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Health Magazine").length
    const HistoryMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "History Magazine").length
    const HomeMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Home Magazine").length
    const MusicMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Music Magazine").length
    const PetMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Pet Magazine").length
    const PhotographyMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Photography Magazine").length
    const SportsMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Sports Magazine").length
    const TravelMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === "Travel Magazine").length
    
    
    const webLogoProxy = process.env.REACT_APP_WEBLOGO_PROXY;
    const [thumbnails, setThumbnails] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
        
    const filteredMagazines = dataList?.viewAllMagazines?.filter((magazine) =>
      magazine.magazine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magazine.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magazine.magazine_category.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    useEffect(() => {
      const fetchThumbnails = async () => {
          const newThumbnails = {};
  
          await Promise.all(
            filteredMagazines?.map(async (details) => {
                  try {
                      const response = await axios.get(
                          `${webLogoProxy}?url=${encodeURIComponent(details?.magazine_website)}`
                      );
  
                      // Ensure the response is valid
                      if (response.data.image && response.data.image !== "No image found") {
                          newThumbnails[details?.magazine_website] = response.data.image;
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
  
      if (filteredMagazines?.length) {
        fetchThumbnails();
      }
    }, [filteredMagazines]);


    return (
        <div className='mainContainer magazine'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
              <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
              </div>
            </div>

            <section className="magazineContainerPage top">
              {/* <div className="magazineContentPage top1">
                <img src={require('../assets/imgs/MagazinesBG.png')} alt="" />
              </div> */}
              <div className="magazineContentPage top2">
                <div className="mgzncpt2 left">
                  <h3>MAGAZINES</h3>
                  <h5>MAGAZINES AROUND THE WORLD BY CATEGORY</h5>
                </div>
                <div className="mgzncpt2 right">
                  <input type="text" placeholder='Search keyword, article or topic here...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                  <div className="mgzncpt2rBtn">
                    <button><FaSearch className='faIcons'/></button>
                    <button><FaMicrophone className='faIcons'/></button>
                  </div>
                </div>
              </div><hr />
            </section>
            <section className="magazineContainerPage mid">
              {(searchTerm && filteredMagazines.length > 0) ? <>
                <div className="magazinCatContentPage mid1">
                  {filteredMagazines.map((details, i) => (
                    <a key={i} href={details?.magazine_website} target="_blank" rel="noopener noreferrer">
                      <div className='mgznctcpm2Img'>
                        <img src={details?.country ? `https://flagcdn.com/w320/${(details?.country).toLowerCase()}.png` : require('../assets/imgs/TDULandingBG.png')} alt="" id="mgznctcpm2iFlag" />
                        <img src={thumbnails[details?.magazine_website]} alt='' id='mgznctcpm2iLogo' />
                      </div>
                      <div className='mgznctccpm2Dets'>
                        <h6>{details?.magazine_name}</h6>
                        <p>{details?.magazine_description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </>:<>
                <div className="magazineContentPage mid1">
                  <Link className="mgzncpm1" to='/Magazines/ArtMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/artMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>ART MAGAZINES</h5>
                      <p>{ArtMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/BoatMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/boatMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>BOAT MAGAZINES</h5>
                      <p>{BoatMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/BusinessMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/businessMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>BUSINESS MAGAZINES</h5>
                      <p>{BusinessMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/CarMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/carMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>CAR MAGAZINES</h5>
                      <p>{CarMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/ChildrenMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/childrensMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>CHILDREN MAGAZINES</h5>
                      <p>{ChildrensMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/ComputerMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/computerMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>COMPUTER MAGAZINES</h5>
                      <p>{ComputerMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/CookingMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/cookingMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>COOKING MAGAZINES</h5>
                      <p>{CookingMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/CruiseMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/cruiseMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>CRUISE MAGAZINES</h5>
                      <p>{CruiseMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/EducationMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/educationMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>EDUCATION MAGAZINES</h5>
                      <p>{EducationMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/EntertainmentMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/entertainmentMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>ENTERTAINMENT MAGAZINES</h5>
                      <p>{EntertainmentMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/FashionMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/fashionMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>FASHION MAGAZINES</h5>
                      <p>{FashionMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/FinanceAndMoneyMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/financeMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>FINANCE AND MONEY MAGAZINES</h5>
                      <p>{FinanceAndMoneyMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/HealthMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/healthMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>HEALTH MAGAZINES</h5>
                      <p>{HealthMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/HistoryMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/historyMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>HISTORY MAGAZINES</h5>
                      <p>{HistoryMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/HomeMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/homeMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>HOME AND TUTORIAL MAGAZINES</h5>
                      <p>{HomeMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/MusicMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/musicMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>MUSIC MAGAZINES</h5>
                      <p>{MusicMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/PetMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/petMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>PET MAGAZINES</h5>
                      <p>{PetMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/PhotographyMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/photographyMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>PHOTOGRAPHY MAGAZINES</h5>
                      <p>{PhotographyMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/SportsMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/sportsMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>SPORTS MAGAZINES</h5>
                      <p>{SportsMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                  <Link className="mgzncpm1" to='/Magazines/TravelMagazines'>
                    <div className='mgzncpm1Img'>
                      <img src={require('../assets/imgs/Magazine/travelMagazines.png')} alt="" />
                    </div>
                    <div className='mgzncpm1Content'>
                      <h5>TRAVEL MAGAZINES</h5>
                      <p>{TravelMagazine || 0} Online Sources</p>
                    </div>
                  </Link>
                </div>
              </>}
            </section>

        </div>
    )
}

export default Magazine