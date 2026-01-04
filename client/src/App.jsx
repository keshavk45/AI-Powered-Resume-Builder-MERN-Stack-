import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, setLoading } from './redux/authSlice'; // Adjust path to your Redux slice
import api from './api'; // Adjust path to your API instance
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ResumeBuilder from './pages/ResumeBuilder.jsx';
import Preview from './pages/preview.jsx';
import Login from './pages/Login.jsx';
import Layout from './pages/Layout.jsx';

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get('/api/users/data', {
          headers: {
            Authorization: token
          }
        });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home />} />

      {/* Auth routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Login mode="signup" />} />
      <Route path='/register' element={<Navigate to='/signup' replace />} />

      <Route path='/app' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='builder/:resumeId' element={<ResumeBuilder />} />
      </Route>

      <Route path='/view/:resumeId' element={<Preview />} />
    </Routes>
  );
};

export default App;
