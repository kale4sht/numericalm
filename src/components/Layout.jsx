import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import OnboardingModal from './OnboardingModal';
import { Toaster } from 'sonner';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-nc-cream">
      <OnboardingModal />
      <Toaster position="top-center" />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}