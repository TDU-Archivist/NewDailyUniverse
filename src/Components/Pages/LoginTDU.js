import React, { useEffect, useState } from 'react'
import "../CSS/login.css";
import { MainDataLoad } from './MainDataContext';
import { 
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaSearch 
} from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

const LoginTDU = () => {
    const { 
      setCreateTDUAccount,
      setLoginTDUAccount,
    } = MainDataLoad(); 
    const [viewPassword, setViewPassword] = useState(false)
    
    const handleCloseModalLogin = () => {
        setCreateTDUAccount(false)
        setLoginTDUAccount(false)
    }
    const handleViewPassword = () => {
        setViewPassword(true)
    }
    const handleHidePassword = () => {
        setViewPassword(false)
    }
    const handleRegisterTDUAccount = () => {
        setCreateTDUAccount(true)
        setLoginTDUAccount(false)
    }





    return (
        <div className='modalContainer login'>
            <div className="modalContentLogin">
                <div className="mdlcntntLog left">
                    <div className="mdlcntntllHeader">
                        <h5>WELCOME TO <br />THE DAILY UNIVERSE</h5>
                        <h6>LOGIN ACCOUNT</h6>
                    </div>
                    <div className="mdlcntntllContent">
                        <div>
                            <label htmlFor=""><p>Username</p></label>
                            <input type="text" placeholder='John Roberts'/>
                        </div>
                        <div>
                            <label htmlFor=""><p>Password</p></label>
                            {!viewPassword ? 
                                <button onClick={handleViewPassword}><FaEye className='faIcons'/></button> :
                                <button onClick={handleHidePassword}><FaEyeSlash className='faIcons'/></button>
                            }
                            <input type={!viewPassword ? "password" : "text"} placeholder='********'/>
                        </div>
                    </div>
                    <div className="mdlcntntllTerms">
                        <p>By logging in, you agree to The Daily Universe's <br />
                        Terms & Conditions and Privacy Policy</p>
                    </div>
                    <div className="mdlcntntllSubmit">
                        <button>LOGIN</button>
                    </div><hr />
                    <div className="mdlcntntllGoogle">
                        <button><FcGoogle className='faIcons'/> LOGIN GOOGLE ACCOUNT</button>
                    </div>
                </div>
                <div className="mdlcntntLog right">
                    <button id='modalContainerClose' onClick={handleCloseModalLogin}><FaTimes className='faIcons'/></button>
                    <button id='modalContainerLoginBtn' onClick={handleRegisterTDUAccount}>I don't have an Account, REGISTER</button>
                </div>
            </div>
        </div>
    )
}

export default LoginTDU