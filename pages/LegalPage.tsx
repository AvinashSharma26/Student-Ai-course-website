
import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const LegalPage: React.FC = () => {
  const { policy } = useParams();

  const getContent = () => {
    switch(policy) {
      case 'terms':
        return {
          title: "Terms of Service",
          text: "By accessing Nasledie AI Academy, you agree to bound by our global creative standards. All courses provided are for educational purposes. Commercial reuse of course assets without permission is strictly prohibited."
        };
      case 'privacy':
        return {
          title: "Privacy Policy",
          text: "We protect your data with cinematic-grade encryption. Your personal details are only used to provide access to your purchased modules and academy updates. We never sell your synthetic soul to third parties."
        };
      case 'refund':
        return {
          title: "Refund Policy",
          text: "Since our products are digital heritage assets, we offer a strict 7-day refund policy if the content has not been consumed (less than 10% progress). We believe in the value of our teaching."
        };
      default:
        return { title: "Legal Node", text: "Information not found." };
    }
  };

  const { title, text } = getContent();

  return (
    <main className="pt-32 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-xs uppercase tracking-[0.4em] gold-text font-bold mb-4">Official Documentation</h1>
        <h2 className="text-4xl md:text-5xl font-serif-cinzel mb-12">{title}</h2>
        <div className="p-10 border border-emerald-900 bg-black/40 text-gray-400 leading-relaxed space-y-6">
          <p>{text}</p>
          <p>Last updated: June 2026</p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LegalPage;
