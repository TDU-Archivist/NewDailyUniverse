import React, { useEffect, useState } from 'react'
import "../CSS/adminPanel.css";
import { MainDataLoad } from './MainDataContext';
import WeeklyBarGraph from './WeeklyBarGraph';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const AdminPanel = () => {
    const { 
        webLoader,
        userLoggedIn,
        StoredUserID,
        StoredUserDataJSON,
        fetchAllArticles,
        viewAllArticles,
    } = MainDataLoad(); 

    const weeklyData = [
        { week: 'Week 1', value: 0 },
        { week: 'Week 2', value: 0 },
        { week: 'Week 3', value: 0 },
        { week: 'Week 4', value: 0 },
    ];

    // Dashboard Section Change

    const [viewMainDashboard, setViewMainDashboard] = useState(true);
    const [viewMainUsers, setViewMainUsers] = useState(false);
    const [viewMainAds, setViewMainAds] = useState(false);
    const [viewMainPolls, setViewMainPolls] = useState(false);
    const [viewMainProducts, setViewMainProducts] = useState(false);
    const [viewMainMap, setViewMainMap] = useState(false);


    const handleViewMainDashboard = () => {
        setViewMainDashboard(true);
        setViewMainUsers(false);
        setViewMainAds(false);
        setViewMainPolls(false);
        setViewMainProducts(false);
        setViewMainMap(false);
    }


    const handleViewMainMap = () => {
        setViewMainDashboard(false);
        setViewMainUsers(false);
        setViewMainAds(false);
        setViewMainPolls(false);
        setViewMainProducts(false);
        setViewMainMap(true);
    }


    // Main Section Panel

    const [viewFullDashboardSec, setViewFullDashboardSec] = useState(true);
    const [viewAddArticleSec, setViewAddArticleSec] = useState(false);
    const [viewAddMovieReviewSec, setViewAddMovieReviewSec] = useState(false);
    const [viewAddTouristSpotSec, setViewAddTouristSpotSec] = useState(false);

    const handleViewFullDashboardSection = () => {
        setViewFullDashboardSec(true);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
    }
    const handleViewAddArticleSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(true);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(false);
    }
    const handleViewMovieReviewSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(true);
        setViewAddTouristSpotSec(false);
    }
    const handleViewTouristSpotSection = () => {
        setViewFullDashboardSec(false);
        setViewAddArticleSec(false);
        setViewAddMovieReviewSec(false);
        setViewAddTouristSpotSec(true);
    }



    // Add Map Details Setup

    const [countryList, setCountryList] = useState([]);
    const [searchTermCountry, setSearchTermCountry] = useState("");
    const [suggestionsCountries, setSuggestionsCountries] = useState([]);
    const [suggestionsCountriesSelection, setSuggestionsCountriesSelection] = useState(false);

    const fetchSearchCountries = async () => {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          const data = await response.json();
          const countryNames = data.map((country) => country.name.common);
          setCountryList(countryNames);
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
    };
    const handleInputSearchCountry = (e) => {
        const value = e.target.value;
        setSearchTermCountry(value);
        setSuggestionsCountriesSelection(true);
    
        if (value) {
          const filtered = countryList.filter((country) =>
            country.toLowerCase().startsWith(value.toLowerCase())
          );
          setSuggestionsCountries(filtered.slice(0, 10)); // Limit suggestions to 10
        } else {
          setSuggestionsCountries([]);
        }
    };
    const handleSuggestionCountry = (suggestion) => {
        setSearchTermCountry(suggestion);
        setSuggestionsCountries([]);
        setSuggestionsCountriesSelection(false);
    };
    useEffect(() => {
        fetchSearchCountries();
    }, []);

    const [capitalLoader, setCapitaLoader] = useState(false);
    const [capitalResponse, setCapitaResponse] = useState('');
    const [addCapitalContinent, setAddCapitalContinent] = useState('');
    const [addCapitalState, setAddCapitalState] = useState('');
    const [addCapitalName, setAddCapitalName] = useState('');
    const [addCapitalLatitude, setAddCapitalLatitude] = useState('');
    const [addCapitalLongitude, setAddCapitalLongitude] = useState('');
    const [addCapitalImage1, setAddCapitalImage1] = useState('');
    const [addCapitalImage2, setAddCapitalImage2] = useState('');
    const [addCapitalImage3, setAddCapitalImage3] = useState('');
    
    const tduAddCapitalAPI = process.env.REACT_APP_TDU_ADD_CAPITAL_API;


    const addCountryCapital = async () => {
        setCapitaLoader(true);
        if(!addCapitalName || !addCapitalLatitude || !addCapitalLongitude){
            setArticleLoader(false);
            setArticleResponse('Please fill up all fields')
            return;
        }

        const fullHash = CryptoJS.SHA256(`${addArticleTitle}, ${addArticleWritter}, ${addArticleContent}, ${new Date()}`).toString(CryptoJS.enc.Hex);
        const shortHash = fullHash.substring(0, 5);

        const cleanSymbols = addArticleTitle.replace(/[^a-zA-Z0-9 ]/g, '');
        const articleCanonical = cleanSymbols.replace(/\s+/g, '-');

        const formAddCountryCapital = {
            tdu_code: `TDU_Capital${shortHash}`,
            tdu_continent: addCapitalContinent,
            tdu_country: searchTermCountry,
            tdu_state: addCapitalState,
            tdu_name: addCapitalName,
            tdu_latitude: addCapitalLatitude,
            tdu_longitude: addCapitalLongitude,
            tdu_image1: addCapitalImage1,
            tdu_image2: addCapitalImage2,
            tdu_image3: addCapitalImage3
        };


        try {
            const submitArticleResponse = await axios.post(tduAddCapitalAPI, formAddCountryCapital);
            const responseMessage = submitArticleResponse.data;
    
            if (responseMessage.success === 'true') {
                setCapitaLoader(false)
                setCapitaResponse(responseMessage.message);
                setSearchTermCountry('');
                setAddCapitalName('');
                setAddCapitalState('');
                setAddCapitalLatitude('');
                setAddCapitalLongitude();
                setAddCapitalImage1('');
                setAddCapitalImage2('');
                setAddCapitalImage3();

                const timeoutId = setTimeout(() => {
                    setCapitaResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === 'false') {
                setCapitaLoader(false)
                setCapitaResponse(responseMessage.message);
                setSearchTermCountry('');
                setAddCapitalName('');
                setAddCapitalState('');
                setAddCapitalLatitude('');
                setAddCapitalLongitude();
                setAddCapitalImage1('');
                setAddCapitalImage2('');
                setAddCapitalImage3();

                const timeoutId = setTimeout(() => {
                    setCapitaResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setCapitaLoader(false);
        } finally {
            setCapitaLoader(false);
        }
    };

    // Add news article setup

    const [addArticleCountry, setAddArticleCountry] = useState('');
    const [addArticleType, setAddArticleType] = useState('');
    const [addArticleTitle, setAddArticleTitle] = useState('');
    const [addArticleSubTitle, setAddArticleSubtitle] = useState('');
    const [addArticleWritter, setAddArticleWritter] = useState('');
    const [addArticleImage, setAddArticleImage] = useState('');
    const [addArticleCopyright, setAddArticleCopyright] = useState('');
    const [addArticleContent, setAddArticleContent] = useState('');
    const [articleLoader, setArticleLoader] = useState(false);
    const [articleResponse, setArticleResponse] = useState('')

    const tduPublishArticleAPI = process.env.REACT_APP_TDU_ADD_ARTICLE_API;

    const handleUploadArticleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAddArticleImage(file?.name);
        }
    };

    const publishNewsArticle = async () => {
        setArticleLoader(true);
        if(!addArticleTitle || !addArticleWritter || !addArticleContent){
            setArticleLoader(false);
            setArticleResponse('Please fill up all fields')
            return;
        }

        const fullHash = CryptoJS.SHA256(`${addArticleTitle}, ${addArticleWritter}, ${addArticleContent}, ${new Date()}`).toString(CryptoJS.enc.Hex);
        const shortHash = fullHash.substring(0, 20);

        const cleanSymbols = addArticleTitle.replace(/[^a-zA-Z0-9 ]/g, '');
        const articleCanonical = cleanSymbols.replace(/\s+/g, '-');

        const formPublishNewsArticle = {
            tdu_code: `TDU_Article${shortHash}`,
            tdu_country: addArticleCountry,
            tdu_type: addArticleType,
            tdu_canonical: articleCanonical,
            tdu_title: addArticleTitle,
            tdu_subtitle: addArticleSubTitle,
            tdu_writer: addArticleWritter,
            tdu_image: addArticleImage,
            tdu_copyright: addArticleCopyright,
            tdu_content: addArticleContent
        };

        // const jsonWalletDetails = JSON.stringify(formPublishNewsArticle);
        // console.log(jsonWalletDetails);

        try {
            const submitArticleResponse = await axios.post(tduPublishArticleAPI, formPublishNewsArticle);
            const responseMessage = submitArticleResponse.data;
    
            if (responseMessage.success === 'true') {
                setArticleLoader(false)
                setArticleResponse(responseMessage.message);
                setAddArticleTitle('');
                setAddArticleSubtitle('');
                setAddArticleImage('');
                setAddArticleContent('');
                fetchAllArticles();

                const timeoutId = setTimeout(() => {
                    setArticleResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            } 
            
            if (responseMessage.success === 'false') {
                setArticleLoader(false);
                setArticleResponse(responseMessage.message);
                setAddArticleTitle('');
                setAddArticleSubtitle('');
                setAddArticleImage('');
                setAddArticleContent('');

                
                const timeoutId = setTimeout(() => {
                    setArticleResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
    
        } catch (error) {
            console.error(error);
            setArticleLoader(false);
        }
    };











    
    return (
        <div className='mainContainer adminPanel'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                </div>
            </div>
            <section className="adminPanelContainerPage">
                <div className="adminPanelContentPage">
                    <div className="admnpnlcp left">
                        <div className="admnpnlcplHeader">
                            <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                            <span>
                                <h5>THE DAILY UNIVERSE</h5>
                                <h6>ADMIN PANEL</h6>
                            </span>
                        </div>
                        <div className="admnpnlcplNavigations">
                            <button className={viewFullDashboardSec ? "active" : ""} onClick={handleViewFullDashboardSection}><h6>DASHBOARD</h6></button>
                            <button className={viewAddArticleSec ? "active" : ""} onClick={handleViewAddArticleSection}><h6>ADD NEWS ARTICLE</h6></button>
                            <button className={viewAddMovieReviewSec ? "active" : ""} onClick={handleViewMovieReviewSection}><h6>ADD MOVIE REVIEW</h6></button>
                            <button className={viewAddTouristSpotSec ? "active" : ""} onClick={handleViewTouristSpotSection}><h6>ADD TOURIST SPOTS</h6></button>
                            <div className="admnpnlcplnOthers">
                                <h6 id='admnpnlcplnoNavs'>OTHERS</h6>
                                <button className=''><h6>ADD TELECAST CHANNEL</h6></button>
                                <button className=''><h6>ADD NEWSPAPER</h6></button>
                                <button className=''><h6>ADD MAGAZINE</h6></button>
                                <button className=''><h6>ADD RESTAURANT</h6></button>
                                <button className=''><h6>ADD SPORTS TEAM</h6></button>
                                <button className=''><h6>ADD AIRLINE</h6></button>
                                <button className=''><h6>ADD AIRPORT</h6></button>
                                <button className=''><h6>ADD VISA GUIDE</h6></button>
                            </div>
                        </div>
                    </div>
                    <div className="admnpnlcp right">
                        {viewFullDashboardSec && <div className="admnpnlcprContainer dashboard">
                            <h4>DASHBOARD</h4>
                            <p>Welcome to the Admin Panel {StoredUserDataJSON?.username}! By accessing this panel, you agree to adhere to TDU's Content Terms and Conditions and Privacy Policies.</p>
                            <div className="admnpnlcprNavigation">
                                <button className={viewMainDashboard ? 'active' : ''} onClick={handleViewMainDashboard}>OVERVIEW</button>
                                <button>USERS</button>
                                <button>ADS</button>
                                <button>POLLS</button>
                                <button>PRODUCTS</button>
                                <button className={viewMainMap ? 'active' : ''} onClick={handleViewMainMap}>MAP</button>
                            </div>
                            {viewMainDashboard && <div className="admnpnlcprContents">
                                <div className="admnpnlcprcNumSummary">
                                    <div>
                                        <h4>0</h4>
                                        <h6>TOTAL USERS</h6>
                                    </div>
                                    <div>
                                        <h4>0</h4>
                                        <h6>PUBLISHED ARTICLES TODAY</h6>
                                    </div>
                                    <div>
                                        <h4>{viewAllArticles.length}</h4>
                                        <h6>TOTAL ARTICLES</h6>
                                    </div>
                                    <div>
                                        <h4>0</h4>
                                        <h6>TOTAL MOVIE REVIEWS</h6>
                                    </div>
                                    <div>
                                        <h4>0</h4>
                                        <h6>TOTAL DESTINATIONS</h6>
                                    </div>
                                </div>
                                <div className="admnpnlcprc graphData">
                                    <div className="admnpnlcprcgd left">
                                        <div className="admnpnlcprcgdlHeader">
                                            <h6>USER MONTHLY REGISTRATION</h6>
                                            <div>
                                                <select name="" id="">
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May">May</option>
                                                    <option value="June">June</option>
                                                    <option value="July">July</option>
                                                    <option value="August">August</option>
                                                    <option value="September">September</option>
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>
                                                </select>
                                                <select name="" id="">
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2027">2027</option>
                                                    <option value="2028">2028</option>
                                                    <option value="2029">2029</option>
                                                    <option value="2030">2030</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcgdlGraph">
                                            <WeeklyBarGraph weeklyData={weeklyData} />
                                        </div>
                                    </div>
                                    <div className="admnpnlcprcgd right">
                                        <div className="admnpnlcprcgdrHeader">
                                            <h6>TODAY PUBLISHED ARTICLES</h6>
                                        </div>
                                        <div className="admnpnlcprcgdrPublished">
                                            <div className="admnpnlcprcgdrpEmpty">
                                                <span>
                                                    <p>No Articles Published Yet</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprc sMovieReview">
                                    <h6>RECENT MOVIE REVIEWS</h6>
                                    <div className="admnpnlcprcsmrContainer">
                                        <div className="admnpnlcprcsrscEmpty">
                                            <span>
                                                <p>No Added Movie Reviews Yet</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="admnpnlcprc sTouristSpot">
                                    <h6>RECENTLY ADDED TOURIST DESTINATION</h6>
                                    <div className="admnpnlcprcsrsContainer">
                                        <div className="admnpnlcprcsrscEmpty">
                                            <span>
                                                <p>No Added Tourist Destination Yet</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {viewMainMap && <div className="admnpnlcprContents">
                                <div className="admnpnlcprcHeader">
                                    <h5>INSERT MAP POINT</h5>
                                </div>
                                <div className="admnpnlcprc capital">
                                    <h5>INSERT CAPITAL</h5>
                                    <div className="admnpnlcprccapitalContainer">
                                        <div className="admnpnlcprcccContents left">
                                            <div>
                                                <label htmlFor=""><h6>CONTINENT</h6></label>
                                                <select name="" id="" value={addCapitalContinent} onChange={(e) => setAddCapitalContinent(e.target.value)}>
                                                    <option value="">Select Continent</option>
                                                    <option value="Africa">Africa</option>
                                                    <option value="Asia">Asia</option>
                                                    <option value="Europe">Europe</option>
                                                    <option value="Ocenia">Ocenia</option>
                                                    <option value="North America">North America</option>
                                                    <option value="South America">South America</option>
                                                </select>
                                            </div>
                                            <div className='admnpnlcprcccCountry'>
                                                <label htmlFor=""><h6>COUNTRY</h6></label>
                                                <input type="text" placeholder='Search Country here...' value={searchTermCountry} onChange={handleInputSearchCountry}/>
                                                {suggestionsCountriesSelection && <>
                                                    {(searchTermCountry.length > 0 || searchTermCountry != '') && 
                                                        <div className="admnpnlcprcccSuggestions">
                                                        <ul>
                                                            {suggestionsCountries.map((suggestion, index) => (
                                                            <li key={index} onClick={() => handleSuggestionCountry(suggestion)}>{suggestion}</li>
                                                            ))}
                                                        </ul>
                                                        </div>
                                                    }
                                                </>}
                                            </div>
                                        </div>
                                        <div className="admnpnlcprcccContents right">
                                            <div className="admnpnlcprccccr">
                                                <div>
                                                    <label htmlFor=""><h6>STATE/CITY</h6></label>
                                                    <input type="text" placeholder='Ex. Manila City' onChange={(e) => setAddCapitalState(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>CAPITAL NAME</h6></label>
                                                    <input type="text" placeholder='Ex. Manila' onChange={(e) => setAddCapitalName(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>LATITUDE</h6></label>
                                                    <input type="text" placeholder='Insert image link only' onChange={(e) => setAddCapitalLatitude(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>LONGTITUDE</h6></label>
                                                    <input type="text" placeholder='Insert image link only' onChange={(e) => setAddCapitalLongitude(e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="admnpnlcprccccrImg">
                                                <div>
                                                    <label htmlFor=""><h6>IMAGE LINK 1</h6></label>
                                                    <input type="text" placeholder='Insert image link only' onChange={(e) => setAddCapitalImage1(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>IMAGE LINK 2</h6></label>
                                                    <input type="text" placeholder='Insert image link only' onChange={(e) => setAddCapitalImage2(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label htmlFor=""><h6>IMAGE LINK 3</h6></label>
                                                    <input type="text" placeholder='Insert image link only' onChange={(e) => setAddCapitalImage3(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admnpnlcprccapitalBtn">
                                        <p>{capitalResponse}</p>
                                        {capitalLoader ?
                                            <button><h6>ADDING...</h6></button>:
                                            <button onClick={addCountryCapital}><h6>ADD CAPITAL</h6></button>
                                        }
                                    </div>
                                </div>
                            </div>}
                        </div>}
                        {viewAddArticleSec && <div className="admnpnlcprContainer addArticle">
                            <h4>ADD NEWS ARTICLE</h4>
                            <p>Here, you can simultaneously add new articles of various types, which will be displayed on the website.</p>
                            <div className="admnpnlcprcAddArticle">
                                <div className="admnpnlcprcaa left">
                                    <div>
                                        <label htmlFor=""><h6>COUNTRY</h6></label>
                                        <select name="" id="" onChange={(e) => setAddArticleCountry(e.target.value)}>
                                            <option value="">Select Country</option>
                                            <option value="AF">Afghanistan</option>
                                            <option value="AL">Albania</option>
                                            <option value="DZ">Algeria</option>
                                            <option value="AD">Andorra</option>
                                            <option value="AO">Angola</option>
                                            <option value="AG">Antigua and Barbuda</option>
                                            <option value="AR">Argentina</option>
                                            <option value="AM">Armenia</option>
                                            <option value="AU">Australia</option>
                                            <option value="AT">Austria</option>
                                            <option value="AZ">Azerbaijan</option>
                                            <option value="BS">Bahamas</option>
                                            <option value="BH">Bahrain</option>
                                            <option value="BD">Bangladesh</option>
                                            <option value="BB">Barbados</option>
                                            <option value="BY">Belarus</option>
                                            <option value="BE">Belgium</option>
                                            <option value="BZ">Belize</option>
                                            <option value="BJ">Benin</option>
                                            <option value="BT">Bhutan</option>
                                            <option value="BO">Bolivia</option>
                                            <option value="BA">Bosnia and Herzegovina</option>
                                            <option value="BW">Botswana</option>
                                            <option value="BR">Brazil</option>
                                            <option value="BN">Brunei</option>
                                            <option value="BG">Bulgaria</option>
                                            <option value="BF">Burkina Faso</option>
                                            <option value="BI">Burundi</option>
                                            <option value="CV">Cabo Verde</option>
                                            <option value="KH">Cambodia</option>
                                            <option value="CM">Cameroon</option>
                                            <option value="CA">Canada</option>
                                            <option value="CF">Central African Republic</option>
                                            <option value="TD">Chad</option>
                                            <option value="CL">Chile</option>
                                            <option value="CN">China</option>
                                            <option value="CO">Colombia</option>
                                            <option value="KM">Comoros</option>
                                            <option value="CD">Congo, Democratic Republic of the</option>
                                            <option value="CG">Congo, Republic of the</option>
                                            <option value="CR">Costa Rica</option>
                                            <option value="CI">Côte d'Ivoire</option>
                                            <option value="HR">Croatia</option>
                                            <option value="CU">Cuba</option>
                                            <option value="CY">Cyprus</option>
                                            <option value="CZ">Czechia</option>
                                            <option value="DK">Denmark</option>
                                            <option value="DJ">Djibouti</option>
                                            <option value="DM">Dominica</option>
                                            <option value="DO">Dominican Republic</option>
                                            <option value="EC">Ecuador</option>
                                            <option value="EG">Egypt</option>
                                            <option value="SV">El Salvador</option>
                                            <option value="GQ">Equatorial Guinea</option>
                                            <option value="ER">Eritrea</option>
                                            <option value="EE">Estonia</option>
                                            <option value="SZ">Eswatini</option>
                                            <option value="ET">Ethiopia</option>
                                            <option value="FJ">Fiji</option>
                                            <option value="FI">Finland</option>
                                            <option value="FR">France</option>
                                            <option value="GA">Gabon</option>
                                            <option value="GM">Gambia</option>
                                            <option value="GE">Georgia</option>
                                            <option value="DE">Germany</option>
                                            <option value="GH">Ghana</option>
                                            <option value="GR">Greece</option>
                                            <option value="GD">Grenada</option>
                                            <option value="GT">Guatemala</option>
                                            <option value="GN">Guinea</option>
                                            <option value="GW">Guinea-Bissau</option>
                                            <option value="GY">Guyana</option>
                                            <option value="HT">Haiti</option>
                                            <option value="HN">Honduras</option>
                                            <option value="HU">Hungary</option>
                                            <option value="IS">Iceland</option>
                                            <option value="IN">India</option>
                                            <option value="ID">Indonesia</option>
                                            <option value="IR">Iran</option>
                                            <option value="IQ">Iraq</option>
                                            <option value="IE">Ireland</option>
                                            <option value="IL">Israel</option>
                                            <option value="IT">Italy</option>
                                            <option value="JM">Jamaica</option>
                                            <option value="JP">Japan</option>
                                            <option value="JO">Jordan</option>
                                            <option value="KZ">Kazakhstan</option>
                                            <option value="KE">Kenya</option>
                                            <option value="KI">Kiribati</option>
                                            <option value="KR">Korea, South</option>
                                            <option value="KW">Kuwait</option>
                                            <option value="KG">Kyrgyzstan</option>
                                            <option value="LA">Laos</option>
                                            <option value="LV">Latvia</option>
                                            <option value="LB">Lebanon</option>
                                            <option value="LS">Lesotho</option>
                                            <option value="LR">Liberia</option>
                                            <option value="LY">Libya</option>
                                            <option value="LI">Liechtenstein</option>
                                            <option value="LT">Lithuania</option>
                                            <option value="LU">Luxembourg</option>
                                            <option value="MG">Madagascar</option>
                                            <option value="MW">Malawi</option>
                                            <option value="MY">Malaysia</option>
                                            <option value="MV">Maldives</option>
                                            <option value="ML">Mali</option>
                                            <option value="MT">Malta</option>
                                            <option value="MH">Marshall Islands</option>
                                            <option value="MR">Mauritania</option>
                                            <option value="MU">Mauritius</option>
                                            <option value="MX">Mexico</option>
                                            <option value="FM">Micronesia</option>
                                            <option value="MD">Moldova</option>
                                            <option value="MC">Monaco</option>
                                            <option value="MN">Mongolia</option>
                                            <option value="ME">Montenegro</option>
                                            <option value="MA">Morocco</option>
                                            <option value="MZ">Mozambique</option>
                                            <option value="MM">Myanmar</option>
                                            <option value="NA">Namibia</option>
                                            <option value="NR">Nauru</option>
                                            <option value="NP">Nepal</option>
                                            <option value="NL">Netherlands</option>
                                            <option value="NZ">New Zealand</option>
                                            <option value="NI">Nicaragua</option>
                                            <option value="NE">Niger</option>
                                            <option value="NG">Nigeria</option>
                                            <option value="NO">Norway</option>
                                            <option value="OM">Oman</option>
                                            <option value="PK">Pakistan</option>
                                            <option value="PW">Palau</option>
                                            <option value="PA">Panama</option>
                                            <option value="PG">Papua New Guinea</option>
                                            <option value="PY">Paraguay</option>
                                            <option value="PE">Peru</option>
                                            <option value="PH">Philippines</option>
                                            <option value="PL">Poland</option>
                                            <option value="PT">Portugal</option>
                                            <option value="QA">Qatar</option>
                                            <option value="RO">Romania</option>
                                            <option value="RU">Russia</option>
                                            <option value="RW">Rwanda</option>
                                            <option value="WS">Samoa</option>
                                            <option value="SM">San Marino</option>
                                            <option value="SA">Saudi Arabia</option>
                                            <option value="SN">Senegal</option>
                                            <option value="RS">Serbia</option>
                                            <option value="SC">Seychelles</option>
                                            <option value="SL">Sierra Leone</option>
                                            <option value="SG">Singapore</option>
                                            <option value="SK">Slovakia</option>
                                            <option value="SI">Slovenia</option>
                                            <option value="SB">Solomon Islands</option>
                                            <option value="SO">Somalia</option>
                                            <option value="ZA">South Africa</option>
                                            <option value="ES">Spain</option>
                                            <option value="LK">Sri Lanka</option>
                                            <option value="SD">Sudan</option>
                                            <option value="SR">Suriname</option>
                                            <option value="SE">Sweden</option>
                                            <option value="CH">Switzerland</option>
                                            <option value="SY">Syria</option>
                                            <option value="TW">Taiwan</option>
                                            <option value="TJ">Tajikistan</option>
                                            <option value="TZ">Tanzania</option>
                                            <option value="TH">Thailand</option>
                                            <option value="TL">Timor-Leste</option>
                                            <option value="TG">Togo</option>
                                            <option value="TO">Tonga</option>
                                            <option value="TT">Trinidad and Tobago</option>
                                            <option value="TN">Tunisia</option>
                                            <option value="TR">Turkey</option>
                                            <option value="TM">Turkmenistan</option>
                                            <option value="UG">Uganda</option>
                                            <option value="UA">Ukraine</option>
                                            <option value="AE">United Arab Emirates</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="US">United States</option>
                                            <option value="UY">Uruguay</option>
                                            <option value="UZ">Uzbekistan</option>
                                            <option value="VU">Vanuatu</option>
                                            <option value="VE">Venezuela</option>
                                            <option value="VN">Vietnam</option>
                                            <option value="YE">Yemen</option>
                                            <option value="ZM">Zambia</option>
                                            <option value="ZW">Zimbabwe</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor=""><h6>ARTICLE TYPE</h6></label>
                                        <select name="" id="" onChange={(e) => setAddArticleType(e.target.value)}>
                                            <option value="">Select Type</option>
                                            <option value="Good News">Good News</option>
                                            <option value="Breaking News">Breaking News</option>
                                            <option value="Latest News">Latest News</option>
                                            <option value="Political News">Political News</option>
                                            <option value="Business News">Business News</option>
                                            <option value="Sports News">Sports News</option>
                                            <option value="ESports News">Game/ESports News</option>
                                            <option value="Showbiz News">Showbiz News</option>
                                            <option value="Climate News">Climate News</option>
                                            <option value="Tech News">Tech News</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor=""><h6>ARTICLE WRITTER</h6></label>
                                        <input type="text" placeholder='Ex. John Doe' onChange={(e) => setAddArticleWritter(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor=""><h6>ARTICLE IMAGE</h6></label>
                                        <input type="file" onChange={handleUploadArticleImg}/>
                                    </div>
                                    <div>
                                        <label htmlFor=""><h6>ARTICLE IMAGE CREDIT COPYRIGHT</h6></label>
                                        <input type="text" placeholder='Ex. John Doe' onChange={(e) => setAddArticleCopyright(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="admnpnlcprcaa right">
                                    <div className="admnpnlcprcaarHeader">
                                        <div>
                                            <label htmlFor=""><h6>ARTICLE TITLE</h6></label>
                                            <textarea name="" id="" placeholder='Type article title here...' onChange={(e) => setAddArticleTitle(e.target.value)}></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor=""><h6>ARTICLE SUBTITLE</h6></label>
                                            <textarea name="" id="" placeholder='Type article sub title here...' onChange={(e) => setAddArticleSubtitle(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className='admnpnlcprcaarContent'>
                                        <label htmlFor=""><h6>ARTICLE CONTENT</h6></label>
                                        <textarea name="" id="" placeholder='Type the article contents here...' onChange={(e) => setAddArticleContent(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="admnpnlcprcaaBtn">
                                <p>{articleResponse}</p>
                                {articleLoader ?
                                    <button><h6>PUBLISHING...</h6></button>:
                                    <button onClick={publishNewsArticle}><h6>PUBLISH ARTICLE</h6></button>
                                }
                            </div>
                        </div>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminPanel