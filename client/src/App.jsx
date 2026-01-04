import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
    try{
      if(token){
        const { data } = await api.get('/api/users/data',{
          headers: {
            Authorization: token
          }
        })if(data.user){
          dispatch(login({token,us}))
    }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };


  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/app' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='builder/:resumeId' element={<ResumeBuilder />} />
      </Route>

      <Route path='/view/:resumeId' element={<Preview />} />
    </Routes>
  );
};

export default App;
