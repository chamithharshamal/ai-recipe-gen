import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Home;