import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Protected from './components/Protected'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import './App.css'
import Private from './pages/Private'

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsFetching(false);
    });

    return () => unSubscribe();
  }, []); // empty dependency array

  if (isFetching) {
    return null; // or a loading indicator
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route
          path="private"
          element={<Protected user={user}>
            <Private />
          </Protected>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
