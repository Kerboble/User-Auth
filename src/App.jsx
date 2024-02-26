import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Protected from './components/Protected';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import Private from './pages/Private';

function App() {
  // State to store user information
  const [user, setUser] = useState(null);
  // State to manage whether authentication state is still being fetched
  const [isFetching, setIsFetching] = useState(true);

  // Effect hook to subscribe to authentication state changes
  useEffect(() => {
    // Callback function to handle authentication state changes
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set user information if user is authenticated
        setUser(user);
      } else {
        // Set user to null if not authenticated
        setUser(null);
      }
      // Update isFetching to indicate that authentication state has been fetched
      setIsFetching(false);
    });

    // Cleanup function to unsubscribe when component is unmounted
    return () => unSubscribe();
  }, []); // Empty dependency array to run the effect only once on mount

  // If authentication state is still being fetched, you can return a loading indicator
  if (isFetching) {
    return <div>Loading...</div>;
  }

  // If authentication state is fetched, render the application
  return (
    <BrowserRouter>
      <Routes>
        {/* Pass the user prop to the Home component */}
        <Route path="/" element={<Home user={user} />} />
        {/* Protected route with nested Private component */}
        <Route
          path="private"
          element={
            <Protected user={user}>
              <Private />
            </Protected>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
