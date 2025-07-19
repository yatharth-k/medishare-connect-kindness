import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  stat: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, stat, label }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 p-6 flex flex-col items-center gap-2 cursor-pointer group relative overflow-hidden" aria-label={`${label}: ${stat}`}>
    <div className="text-3xl mb-2 group-hover:drop-shadow-glow">{icon}</div>
    <div className="text-4xl font-extrabold text-gray-900">{stat}</div>
    <div className="text-lg font-semibold text-gray-500">{label}</div>
    <div className="absolute inset-0 pointer-events-none group-hover:ring-2 group-hover:ring-blue-200 rounded-xl transition-all duration-200" />
  </div>
);

export default StatCard; 