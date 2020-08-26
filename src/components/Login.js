import React from 'react'
import {auth,provider} from '../firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './Reducer'


const Login = () => {
    const [{},dispatch]=useStateValue()
    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        })
        .catch(err=>alert(err.message))
    }
    return (
        <div className="login">
           <div className="login_container">
               <img src="https://www.freeiconspng.com/thumbs/logo-whatsapp-png/download-and-use-logo-whatsapp-png-clipart-3.png" alt=""/>
               <div className="login_text">
                   <h6>Sign in to WhatsApp</h6>
               </div>
               <button type="submit" onClick={signIn}>
                   Sign In with Google
               </button>
           </div>
        </div>
    )
}

export default Login
