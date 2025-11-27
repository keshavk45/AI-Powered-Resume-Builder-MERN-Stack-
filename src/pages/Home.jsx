import React from 'react';
import Banner from '../components/Home/Banner.jsx';
import Hero from '../components/Home/Hero.jsx';
import Features from '../components/Home/Features.jsx';
import Testimonial from '../components/Home/Testimonial.jsx';
import CalltoAction from '../components/Home/CalltoAction.jsx';
import Footer from '../components/Home/Footer.jsx';

const Home = () => {
  return (
    <div>
        <Banner />
        <Hero />
        <Features />
        <Testimonial />
        <CalltoAction />
        <Footer />
        
    </div>
  )
}

export default Home;