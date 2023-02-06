import './App.css';

import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';

import { useState,useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CreatedPost from './pages/CreatedPost/CreatedPost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {
  const [user,setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      setUser(user)
    })
  },[auth])

  if(loadingUser) {
    return <Loader />
  }
  
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
      <BrowserRouter>
      <Navbar />
        <div className="container">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/posts/:id' element={<Post />}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/' />}/>
          <Route path='/register' element={ !user ? <Register /> : <Navigate to='/' />}/>
          <Route path='/posts/create' element={user ? <CreatedPost /> : <Navigate to='/login' />}/>
          <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to='/login' />}/>
          <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />}/>
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
