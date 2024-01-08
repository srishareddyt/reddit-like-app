import React from 'react';
import PostList from './components/PostList';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostDetails from './components/PostDetails'; 
import Login from './components/Login';


const App = () => {

  console.log(window.location.pathname);
  return (
    <BrowserRouter>
    <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user_id/:user_id/post/:postId" element={<PostDetails />} />
      <Route path="/user_id/:user_id" element={<PostList />} />
    </Routes>

    </div>
    </BrowserRouter>
  );
};

export default App;
