import React, { useEffect, useState } from 'react'
import "../CSS/register.css";
import { MainDataLoad } from './MainDataContext';
import { 
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaSearch 
} from 'react-icons/fa';

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





    return (
        <div className='modalContainer register'>
            <div className="modalContentRegister">
                <div className="mdlcntntReg left">
                    <div className="mdlcntntrlHeader">
                        <h5>WELCOME TO <br />THE DAILY UNIVERSE</h5>
                        <h6>CREATE AN ACCOUNT</h6>
                    </div>
                    <div className="mdlcntntrlContent">
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
                        <div>
                            <label htmlFor=""><p>Email</p></label>
                            <input type="email" placeholder='jroberts@email.com'/>
                        </div>
                    </div>
                    <div className="mdlcntntrlTerms">
                        <p>By registering, you agree to The Daily Universe's <br />
                        Terms & Conditions and Privacy Policy</p>
                    </div>
                    <div className="mdlcntntrlSubmit">
                        <button>SIGNUP</button>
                    </div>
                </div>
                <div className="mdlcntntReg right">
                    <button id='modalContainerClose' onClick={handleCloseModalRegister}><FaTimes className='faIcons'/></button>
                    <button id='modalContainerLoginBtn' onClick={handleLoginTDUAccount}>I already have an Account, LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterTDU