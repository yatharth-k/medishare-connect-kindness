import React from "react";
import StatCard from "../components/ui/StatCard";
import GradientButton from "../components/ui/GradientButton";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { FaPills, FaHeart, FaUsers, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const stats = [
  { icon: <FaPills />, stat: 0, label: "Medicines Donated" },
  { icon: <FaHeart />, stat: 0, label: "Lives Impacted" },
  { icon: <FaUsers />, stat: 0, label: "NGOs Reached" },
  { icon: <FaChartLine />, stat: 0, label: "Impact Score" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans flex flex-col">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        <h1 className="text-2xl font-extrabold text-gradientFrom mb-8">Welcome back, Friend!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s) => (
            <StatCard key={s.label} icon={s.icon} stat={s.stat} label={s.label} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><span className="text-blue-500"><FaPills /></span> Quick Donate</h2>
            <p className="text-gray-500 mb-2">Have unused medicines? Start your donation process now.</p>
            <GradientButton className="w-full text-lg" onClick={() => navigate('/donate-medicine')}>+ Start New Donation</GradientButton>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><span className="text-green-500"><FaUsers /></span> Find NGOs</h2>
            <p className="text-gray-500 mb-2">Discover verified NGOs in your area that need medicines.</p>
            <GradientButton className="w-full text-lg bg-gradient-to-r from-green-400 to-blue-500" onClick={() => navigate('/ngo-map')}>Browse NGO Map</GradientButton>
          </div>
        </div>
        <section className="bg-gradient-to-b from-blue-50 to-green-50 rounded-2xl p-10 flex flex-col items-center text-center mt-8">
          <div className="text-4xl mb-4 text-gradientFrom"><FaHeart /></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Ready to Save Lives?</h2>
          <p className="text-gray-600 mb-6 max-w-xl">Your unused medicines could be someone's lifeline. Start by uploading photos of your unexpired medicines, and we'll connect you with verified NGOs who can distribute them to those in need.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <GradientButton className="text-lg px-8 py-4" onClick={() => navigate('/donate-medicine')}>+ Make Your First Donation</GradientButton>
            <button className="text-gradientFrom font-bold rounded-full px-8 py-4 bg-white shadow hover:bg-blue-50 transition-all border border-blue-100">Learn How It Works</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard; 