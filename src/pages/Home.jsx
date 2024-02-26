import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

function Home({ user }) {
  // State to manage whether the user is signing up or signing in
  const [isSignUp, setIsSignUp] = useState(false);
  // State to store email input
  const [email, setEmail] = useState('');
  // State to store password input
  const [password, setPassword] = useState('');

  // Function to toggle between sign-up and sign-in modes
  const handleChange = () => {
    setIsSignUp(!isSignUp);
  };

  // Function to handle user sign-up
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

  // Function to handle user sign-in
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

  // Function to handle changes in the email input
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  // Function to handle changes in the password input
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // If user is authenticated, redirect to the private route
  if (user) {
    return <Navigate to="/private" />;
  }

  return (
    <section>
      <h2>HomePage</h2>
      <form>
        {/* Conditional rendering based on sign-up or sign-in mode */}
        {!isSignUp ? <legend>Sign up</legend> : <legend>Sign In</legend>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        
        {/* Conditional rendering of the sign-up or sign-in button */}
        {!isSignUp && (
          <button type='button' onClick={handleSignUp}>Sign Up </button>
        )}
        {isSignUp && (
          <button type='button' onClick={handleSignIn}>Sign In </button>
        )}

        {/* Toggle between sign-up and sign-in modes */}
        {isSignUp ? <a onClick={handleChange}>Sign Up</a> : <a onClick={handleChange}>Login</a>}
      </form>
    </section>
  );
}

export default Home;
