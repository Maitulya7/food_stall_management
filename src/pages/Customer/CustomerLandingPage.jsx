import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import DownloadSection from './components/DownloadSection';
import ExtraFeatureSection from './components/ExtraFeatureSection';
import AppInformationSection from './components/AppInformationSection';
import ClientReviewSection from './components/ClientReviewSection';
import ContactUsSection from './components/ContactUsSection';
import Footer from './components/Footer';


const CustomerLandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <DownloadSection />
      <ExtraFeatureSection/>
      <AppInformationSection/>
      <ClientReviewSection/>
      <ContactUsSection/>
      <Footer/>
    </>
  );
};

export default CustomerLandingPage;
