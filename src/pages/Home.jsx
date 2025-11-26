import React from 'react';
import Banner from '../components/Banner.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import Testimonial from '../components/Testimonial.jsx';
import CalltoAction from '../components/CalltoAction.jsx';
import Footer from '../components/Footer.jsx';

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