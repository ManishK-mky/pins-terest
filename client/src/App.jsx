import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import Register from './pages/Index/Register';
import Login from './pages/Login/Login';
import Feed from './pages/Feed/Feed';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/feed' element={<Feed/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
  );
}

export default App;
