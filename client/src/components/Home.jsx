import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';

const Home = () => {
  return (
    <div className="min-h-screen relative bg-cover bg-center bg-no-repeat bg-fixed" 
         style={{backgroundImage: "url('/images/bg.png')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;