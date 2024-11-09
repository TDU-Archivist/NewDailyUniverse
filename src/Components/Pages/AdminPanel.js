import React, { useEffect, useState } from 'react'
import "../CSS/adminPanel.css";
import { MainDataLoad } from './MainDataContext';
import WeeklyBarGraph from './WeeklyBarGraph';

const AdminPanel = () => {
    const { 
        webLoader,
        userLoggedIn,
        StoredUserID,
        StoredUserDataJSON,
    } = MainDataLoad(); 

    const weeklyData = [
        { week: 'Week 1', value: 0 },
        { week: 'Week 2', value: 0 },
        { week: 'Week 3', value: 0 },
        { week: 'Week 4', value: 0 },
    ];
    
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
                            <button className='active'><h6>DASHBOARD</h6></button>
                            <button className=''><h6>ADD NEWS ARTICLE</h6></button>
                            <button className=''><h6>ADD MOVIE REVIEW</h6></button>
                            <button className=''><h6>ADD TOURIST SPOTS</h6></button>
                            <div className="admnpnlcplnOthers">
                                <h6 id='admnpnlcplnoNavs'>OTHERS</h6>
                                <button className=''><h6>ADD TELECAST CHANNEL</h6></button>
                                <button className=''><h6>ADD NEWSPAPER</h6></button>
                                <button className=''><h6>ADD MAGAZINE</h6></button>
                                <button className=''><h6>ADD SPORTS TEAM</h6></button>
                                <button className=''><h6>ADD AIRLINE</h6></button>
                                <button className=''><h6>ADD AIRPORT</h6></button>
                                <button className=''><h6>ADD VISA GUIDE</h6></button>
                            </div>
                        </div>
                    </div>
                    <div className="admnpnlcp right">
                        <h4>DASHBOARD</h4>
                        <p>Welcome to the Admin Panel {StoredUserDataJSON?.username}! By accessing this panel, you agree to adhere to TDU's Content Terms and Conditions and Privacy Policies.</p>
                        <div className="admnpnlcprNavigation">
                            <button className='active'>OVERVIEW</button>
                            <button>USERS</button>
                            <button>ADS</button>
                            <button>POLLS</button>
                            <button>PRODUCTS</button>
                        </div>
                        <div className="admnpnlcprContents">
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
                                    <h4>0</h4>
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminPanel