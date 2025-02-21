import React from 'react';
import AppBar from '@/components/layout/AppBar';
import HeroSection from './HeroSection';
import Footer from '@/components/layout/Footer';
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";


const Index = () => {
  return (
    <div>
      <AppBar />

      <main>
        <HeroSection />
      </main>

      <Footer 
        sections={[
            {
              title: "St Matthias Sabaki",
              links: [
                { name: "Explore", href: "" },
                { name: "About", href: "" },
              ],
            },
            {
              title: "Account",
              links: [
                { name: "Dashboard", href: "/dashboard" },
                { name: "Watchlist", href: ""},
                { name: "Settings", href: "" },
              ],
            },
            {
              title: "Resources",
              links: [
                { name: "Platform Status", href: "" },
                { name: "Partners", href: "" },
                { name: "Newsletter", href: "" },
              ],
            },
            {
              title: "Community",
              links: [
                { name: "Help Center", href: "" },
                { name: "Suggest Feature", href: "" },
                { name: "Subscribe", href: "" },
              ],
            },
          ]}
          socialLinks={[
            { icon: <FaTwitter />, href: "https://twitter.com" },
            { icon: <FaInstagram />, href: "https://instagram.com" },
            { icon: <FaLinkedin />, href: "https://linkedin.com" },
          ]}
          copyrightText="© St Matthias Sabaki, Inc © All Rights Reserved"
          termsLink=""
          privacyPolicyLink=""
      />
    </div>
  );
};

export default Index;
