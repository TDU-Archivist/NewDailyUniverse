import React, { useEffect, useState } from 'react'
import "../CSS/adminPanel.css";
import { MainDataLoad } from './MainDataContext';

const AdminPanel = () => {
    const { 
        webLoader,
        userLoggedIn,
        StoredUserID,
        StoredUserDataJSON,
    } = MainDataLoad(); 


    
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
                            <button className=''><h6>USERS</h6></button>
                            <button className=''><h6>ADD NEWS ARTICLE</h6></button>
                            <button className=''><h6>ADD MOVIE REVIEW</h6></button>
                            <button className=''><h6>ADD TOURIST SPOTS</h6></button>
                            <button className=''><h6>ADD POLL</h6></button>
                            <button className=''><h6>ADD ADS</h6></button>
                            <button className=''><h6>ADD PRODUCT</h6></button>
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
                        <h4>GOOD DAY ADMIN {StoredUserDataJSON?.username},</h4>
                        <p>Welcome to the Admin Panel! By accessing this panel, you agree to adhere to TDU's Content Terms and Conditions and Privacy Policies.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminPanel