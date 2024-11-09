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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorResponseModal, setErrorResponseModal] = useState(false);
    const [successResponseModal, setSuccessResponseModal] = useState(false);
    const [messageResponse, setMessageResponse] = useState('')
    const [viewPassword, setViewPassword] = useState(false)
    const tduUserLoginAPI = process.env.REACT_APP_TDU_USER_LOGIN_API;


    
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


    const handleUserLogin = (e) => {
        e.preventDefault();      
        if (!username || !password) {
            setErrorResponseModal(true)
            setMessageResponse('Please fill up all fields.');

            const timeoutId = setTimeout(() => {
                setErrorResponseModal(false);
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
      

        fetch(tduUserLoginAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tduAccountUsername: username,
                tduAccountPassword: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                const userProfile = JSON.stringify(data)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('tduProfileUserID', data.userid);
                localStorage.setItem('tduProfileAccount', userProfile);
                window.location.reload();
            } else {
                setErrorResponseModal(true)
                setMessageResponse(data.message);

                const timeoutId = setTimeout(() => {
                    setErrorResponseModal(false);
                    setMessageResponse('');
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
        })
        .catch(error => console.error('Error:', error));
    };



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
                    </div>
                    <div className="mdlcntntllTerms">
                        <p>By logging in, you agree to The Daily Universe's <br />
                        Terms & Conditions and Privacy Policy</p>
                    </div>
                    <div className="mdlcntntllSubmit">
                        <button onClick={handleUserLogin}>LOGIN</button>
                    </div><hr />
                    <div className="mdlcntntllGoogle">
                        <button><FcGoogle className='faIcons'/> LOGIN GOOGLE ACCOUNT</button>
                    </div>
                </div>
                <div className="mdlcntntLog right">
                    {errorResponseModal && <div className="mdlcntntrrErrorModal">
                        <p>{messageResponse}</p>
                    </div>}
                    <button id='modalContainerClose' onClick={handleCloseModalLogin}><FaTimes className='faIcons'/></button>
                    <button id='modalContainerLoginBtn' onClick={handleRegisterTDUAccount}>I don't have an Account, REGISTER</button>
                </div>
            </div>
        </div>
    )
}

export default LoginTDU