import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';



function Private() {
  // Function to handle user sign-out
  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log('Sign Out');
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  }

  return (
    <>
      <div>Private</div>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
}

export default Private;
