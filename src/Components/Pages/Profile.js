import React, { useEffect, useState } from 'react'
import "../CSS/userProfile.css";
import { MainDataLoad } from './MainDataContext';
import { 
    MdAdminPanelSettings,
    MdAddModerator,
    MdBookmark    
} from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





const Profile = () => {
    const { 
        webLoader,
        userLoggedIn,
        StoredUserID,
        StoredUserDataJSON,
    } = MainDataLoad(); 

    const [viewSavedArticles, setViewSavedArticles] = useState(true);
    const [viewSavedMovieReviews, setViewSavedMovieReviews] = useState(false);
    const [viewSavedTouristSpots, setViewSavedTouristSpots] = useState(false);

    const handleSavedArticles = () => {
        setViewSavedArticles(true);
        setViewSavedMovieReviews(false);
        setViewSavedTouristSpots(false);
    }
    const handleSavedMovieReviews = () => {
        setViewSavedArticles(false);
        setViewSavedMovieReviews(true);
        setViewSavedTouristSpots(false);
    }
    const handleSavedTouristSpots = () => {
        setViewSavedArticles(false);
        setViewSavedMovieReviews(false);
        setViewSavedTouristSpots(true);
    }



    return (
        <div className='mainContainer userProfile'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                </div>
            </div>
            <section className="userPageContainerPage">
                <div className="userPageContentPage">
                    <div className="usrpgcp left">
                        <div className="usrpgcplHeader">
                            <img src={StoredUserDataJSON?.icon ? `https://staging.thedailyuniverse.com/TDUUsers/${StoredUserDataJSON?.icon}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                        </div>
                        <div className="usrpgcplContents">
                            <div className="usrpgcplcHeader">
                                <h5>
                                    {StoredUserDataJSON?.username}
                                    {(StoredUserDataJSON?.state === "Admin") && <sup><MdAdminPanelSettings className='faIcons'/></sup>}
                                    {(StoredUserDataJSON?.state === "Moderator") && <sup><MdAddModerator className='faIcons'/></sup>}
                                </h5>
                                <h6>{StoredUserDataJSON?.email}</h6>
                                {(StoredUserDataJSON?.subscription === "Subscriber") ?
                                    <Link><h4>SUBSCRIBER</h4></Link>:
                                    <Link><h4>SUBSCRIBE</h4></Link>
                                }
                            </div>
                            <div className="usrpgcplcNavigations">
                                <p>FAVORITES</p>
                                <button className={viewSavedArticles ? "active" : ""} onClick={handleSavedArticles}><h6>ARTICLES</h6></button>
                                <button className={viewSavedMovieReviews ? "active" : ""} onClick={handleSavedMovieReviews}><h6>MOVIE REVIEWS</h6></button>
                                <button className={viewSavedTouristSpots ? "active" : ""} onClick={handleSavedTouristSpots}><h6>TOURIST SPOTS</h6></button>
                                {/* <p>OTHERS</p>
                                <button><h6>NOTIFICATIONS</h6></button>
                                <button><h6>POLLS</h6></button> */}
                            </div>
                        </div>
                    </div>
                    <div className="usrpgcp right">
                        {viewSavedArticles && <div className="usrpgcprContainers articles">
                            <h4>SAVED ARTICLES</h4>
                            <div className="usrpgcprContents">
                                {/* <div className="usrpgcprcEmpty">
                                    <span>
                                        <p>No saved articles yet.</p>
                                    </span>
                                </div> */}
                                <div className="usrpgcprcArticle">
                                    <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                                    <button><MdBookmark className='faIcons'/></button>
                                    <div className="usrpgcprcaCountry">
                                        <img src="" alt="" />
                                    </div>
                                    <div className="usrpgcprcaTitles">
                                        <h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h6>
                                        <span>
                                            <p>By. John Doe</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {viewSavedMovieReviews && <div className="usrpgcprContainers movieReviews">
                            <h4>SAVED MOVIE REVIEWS</h4>
                            <div className="usrpgcprContents">
                                <div className="usrpgcprcEmpty">
                                    <span>
                                        <p>No saved movie reviews yet.</p>
                                    </span>
                                </div>
                            </div>
                        </div>}
                        {viewSavedTouristSpots && <div className="usrpgcprContainers touristSpots">
                            <h4>SAVED TOURIST SPOTS</h4>
                            <div className="usrpgcprContents">
                                <div className="usrpgcprcEmpty">
                                    <span>
                                        <p>No saved tourist spots yet.</p>
                                    </span>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile