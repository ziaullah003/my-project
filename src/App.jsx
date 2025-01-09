import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './features/authSlice';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<h1>404 error</h1>} />
        <Route path="/" element={!token ? <SignUp /> : <Navigate to="/profile" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/profile" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
