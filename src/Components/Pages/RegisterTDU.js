import React, { useEffect, useState } from 'react'
import "../CSS/register.css";
import { MainDataLoad } from './MainDataContext';
import { 
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaSearch 
} from 'react-icons/fa';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const RegisterTDU = () => {
    const { 
      setCreateTDUAccount,
      setLoginTDUAccount,
    } = MainDataLoad(); 
    const [viewPassword, setViewPassword] = useState(false)
    
    const handleCloseModalRegister = () => {
        setCreateTDUAccount(false)
        setLoginTDUAccount(false)
    }
    const handleViewPassword = () => {
        setViewPassword(true)
    }
    const handleHidePassword = () => {
        setViewPassword(false)
    }
    const handleLoginTDUAccount = () => {
        setCreateTDUAccount(false)
        setLoginTDUAccount(true)
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorResponseModal, setErrorResponseModal] = useState(false);
    const [successResponseModal, setSuccessResponseModal] = useState(false);
    const [messageResponse, setMessageResponse] = useState('')
    const tduUserRegistrationAPI = process.env.REACT_APP_TDU_USER_REGISTRATION_API;


    const registerTDUAccount = () => {
        if (!username && !password && !email) {
            setErrorResponseModal(true);
            setMessageResponse("Please fill up all fields.");                
            
            const timeoutId = setTimeout(() => {
                setErrorResponseModal(false);
            }, 3000);
            return () => clearTimeout(timeoutId);
        }

        const fullHash = CryptoJS.SHA256(`${username}, ${username}, ${username}, ${new Date()}`).toString(CryptoJS.enc.Hex);
        const shortHash = fullHash.substring(0, 10);

        const userRegData = {
            tduSetUserID: `TDU_${shortHash}`,
            tduSetUsername: username,
            tduSetPassword: password,
            tduSetEmail: email,
        }

        const userRegDataJSON = JSON.stringify(userRegData);

        try {
            axios.post(tduUserRegistrationAPI, userRegDataJSON)
            .then(response => {
                const resMessage = response.data;
                if (resMessage.success === false) {
                    setErrorResponseModal(true)
                    setMessageResponse(resMessage.message);

                    const timeoutId = setTimeout(() => {
                        setErrorResponseModal(false);
                        setMessageResponse('');
                    }, 3000);
                    return () => clearTimeout(timeoutId);
                    
                }
                if (resMessage.success === true) {
                    setMessageResponse(resMessage.message);
                    setEmail('')
                    setUsername('')
                    setPassword('')
                    setSuccessResponseModal(true)
                    setErrorResponseModal(false)
                    setCreateTDUAccount(false)
                    console.log(resMessage.message);
                }
            }).catch (error =>{
                setMessageResponse(error);
                console.log(error);
                
            });
        } catch (error) {
            console.log("unknown error occured", error);
        }

    };









    return (
        <div className='modalContainer register'>
            <div className="modalContentRegister">
                <div className="mdlcntntReg left">
                    <button id='modalContainerClose' onClick={handleCloseModalRegister}><FaTimes className='faIcons'/></button>
                    <div className="mdlcntntrlHeader">
                        <h5>WELCOME TO <br />THE DAILY UNIVERSE</h5>
                        <h6>CREATE AN ACCOUNT</h6>
                    </div>
                    <div className="mdlcntntrlContent">
                        <div>
                            <label htmlFor=""><p>Username</p></label>
                            <input className={errorResponseModal ? 'error' : ''} type="text" placeholder='John Roberts' onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor=""><p>Password</p></label>
                            {!viewPassword ? 
                                <button onClick={handleViewPassword}><FaEye className='faIcons'/></button> :
                                <button onClick={handleHidePassword}><FaEyeSlash className='faIcons'/></button>
                            }
                            <input className={errorResponseModal ? 'error' : ''} type={!viewPassword ? "password" : "text"} placeholder='********' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor=""><p>Email</p></label>
                            <input className={errorResponseModal ? 'error' : ''} type="email" placeholder='jroberts@email.com' onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mdlcntntrlTerms">
                        <p>By registering, you agree to The Daily Universe's <br />
                        Terms & Conditions and Privacy Policy</p>
                    </div>
                    <div className="mdlcntntrlSubmit">
                        <button onClick={registerTDUAccount}>SIGNUP</button>
                    </div>
                </div>
                <div className="mdlcntntReg right">
                    {errorResponseModal && <div className="mdlcntntrrErrorModal">
                        <p>{messageResponse}</p>
                    </div>}
                    <button id='modalContainerClose' onClick={handleCloseModalRegister}><FaTimes className='faIcons'/></button>
                    <button id='modalContainerLoginBtn' onClick={handleLoginTDUAccount}>I already have an Account, LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterTDU