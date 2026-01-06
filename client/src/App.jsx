import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, setLoading } from './app/features/authSlice';
import api from './api';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ResumeBuilder from './pages/ResumeBuilder.jsx';
import Preview from './pages/preview.jsx';
import Login from './pages/Login.jsx';
import Layout from './pages/Layout.jsx';
import { Toaster } from 'react-hot-toast';

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
    <>
    <Toaster />
    <Routes>
      <Route path='/' element={<Home />} />

      {/* Auth routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Login mode="signup" />} />
      <Route path='/register' element={<Navigate to='/signup?state=register' replace />} />

      <Route path='/app' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='builder/:resumeId' element={<ResumeBuilder />} />
      </Route>

      <Route path='/view/:resumeId' element={<Preview />} />
    </Routes>
    </>
  );
};

export default App;
