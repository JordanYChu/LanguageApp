import React from 'react';
import { auth } from './firebaseFuncs';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import GoogleSignInButton from './assets/web_neutral_sq_SI.svg';

// change to have auth be a param
export const Login = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
    <div>
      
      <button className='shadow-xl' onClick={signInWithGoogle}><img src={GoogleSignInButton} alt="Continue With Google" style={{width: 250}}></img></button>

    </div>
  );
}
export const SignOut = () => {
  signOut(auth);
}


