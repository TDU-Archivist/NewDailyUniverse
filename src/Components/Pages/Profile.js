import React, { useEffect, useState } from 'react'
import "../CSS/userProfile.css";
import { MainDataLoad } from './MainDataContext';

const Profile = () => {
    const { 
        webLoader,
        userLoggedIn,
        StoredUserID,
        StoredUserDataJSON,
    } = MainDataLoad(); 



    return (
        <div className='mainContainer userProfile'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                </div>
            </div>
            <section className="userPageContainerPage top">
                
            </section>
        </div>
    )
}

export default Profile