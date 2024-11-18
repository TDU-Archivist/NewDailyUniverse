import React, { useEffect, useState } from 'react'
import "../CSS/articlePage.css";
import { MainDataLoad } from './MainDataContext';
import { 
    MdAdminPanelSettings,
    MdAddModerator,
    MdBookmark    
} from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";



const formatDateToWordedDate = (numberedDate) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const date = new Date(numberedDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
}
const ArticlePage = () => {
    const { 
        webLoader,
        userLoggedIn,
        StoredUserID,
        StoredUserDataJSON,
        viewAllArticles,
        viewAllWriters,
    } = MainDataLoad(); 
    const { newsCanonical } = useParams();
    const [countryData, setCountryData] = useState(null)
    const specification = viewAllArticles.find(article => article.article_canonical === newsCanonical);
    const writerData = viewAllWriters.find(writer => writer.fullname === `${specification?.article_writter}`)

    const fetchCountryArticle = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/alpha/${specification?.article_country}`);
            const data = response.data[0];
            setCountryData(data);
        } catch (error) {
            console.log(error);
        }
    }
    // Check if data is already available
    if (specification && !countryData) {
        fetchCountryArticle();
    }

    



    return (
        <div className='mainContainer articlePage'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                </div>
            </div>
            {/* <section className="articlePageContainerPage top">
                <div className="artclpcptHeader">
                    <h3><span>{specification?.article_country}:</span> {specification?.article_title}</h3>
                </div>
            </section> */}
            <section className="articlePageContainerPage mid">
                <div className="articlePageContentMid left">
                    <div className="artclpcpmlImg">
                        <img src={specification?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${specification?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                        <p>Image by. {specification?.article_copyright}</p>
                    </div>
                    <div className="artclpcpmlTitle">
                        <h4>{specification?.article_title}</h4>
                    </div>
                    <div className="artclpcpmlAuthor">
                        <span>
                            <img src={writerData?.icon ? `https://staging.thedailyuniverse.com/TDUAuthors/${writerData?.icon}` : (require('../assets/imgs/TDULandingLoginRegister.png'))} alt="" />
                        </span>
                        <div>
                            <h5>Written By. {specification?.article_writter}</h5>
                            <p>Published: {formatDateToWordedDate(specification?.article_timestamp)}</p>
                        </div>
                    </div>
                </div>
                <div className="articlePageContentMid right">
                    <div className="artclpcpmrCountry">
                        <span>
                            <img src={specification?.article_country ? countryData?.flags?.png : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                        </span>
                        <h5>{countryData?.name?.common}</h5>
                    </div>
                    <div className="artclpcpmrSubtitle">
                        <h5>{specification?.article_subtitle}</h5>
                    </div>
                    <div className="artclpcpmrContent">
                        <p>{specification?.article_content}</p>
                    </div>
                </div>
            </section>
            <section className="articlePageContainerPage bot">
                <div className="articlePageContentBot">
                    <h4>RECENTLY ADDED ARTICLES</h4>
                    <div className="artclpcBot">
                        {viewAllArticles.slice(0, 8).map((details, i) => (
                            <Link className="artclpcbArticle" key={i} to={`/News/${details?.article_canonical}`}>
                                <div className="artclpcba">
                                    <img src={details?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${details?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                                </div>
                                <h5>{details?.article_title}</h5>
                                <p>{details?.article_subtitle}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    )
}

export default ArticlePage