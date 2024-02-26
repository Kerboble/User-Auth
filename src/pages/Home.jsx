import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

function Home({user}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = () => {
    setIsSignUp(!isSignUp);
  };

  async function handleSignUp() {
    if (!email || !password) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  async function handleSignIn() {
    if (!email || !password) return;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  if(user){
    return <Navigate to="/private"/>
  }


  return (
    <section>
      <h2>HomePage</h2>
      <form>
        {!isSignUp ? <legend>Sign up</legend> : <legend>Sign In</legend>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        {!isSignUp && (
            <button type='button' onClick={handleSignUp}>Sign Up </button>
        )}
         {isSignUp && (
            <button type='button' onClick={handleSignIn}>Sign In </button>
        )}
        {isSignUp ? <a onClick={handleChange}>Sign Up</a> : <a onClick={handleChange}>Login</a>}
      </form>
    </section>
  );
}

export default Home;
