import React from "react";

interface NGOCardProps {
  name: string;
  location: string;
  specializations: string[];
  needs: string[];
  rating: number;
  verified?: boolean;
}

const NGOCard: React.FC<NGOCardProps> = ({ name, location, specializations, needs, rating, verified }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 p-6 flex flex-col gap-2 relative cursor-pointer group" aria-label={`NGO: ${name}, Location: ${location}`}>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xl font-bold text-gray-900">{name}</span>
      {verified && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full animate-pulse">Verified</span>}
    </div>
    <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
      <span className="material-icons text-blue-400">location_on</span>
      {location}
    </div>
    <div className="flex flex-wrap gap-1 mb-1">
      {specializations.map((tag) => (
        <span key={tag} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{tag}</span>
      ))}
    </div>
    <div className="flex flex-wrap gap-1 mb-1">
      {needs.map((need) => (
        <span key={need} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full animate-bounce">{need}</span>
      ))}
    </div>
    <div className="flex items-center gap-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`material-icons text-yellow-400 text-base ${i < Math.round(rating) ? '' : 'opacity-30'}`}>star</span>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  </div>
);

export default NGOCard; 