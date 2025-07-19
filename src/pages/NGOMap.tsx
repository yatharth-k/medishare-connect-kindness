import React, { useState } from "react";
import NGOCard from "../components/ui/NGOCard";
import SearchFilterBar from "../components/ui/SearchFilterBar";

const ngoList = [
  {
    name: "Akshaya Patra Foundation",
    location: "Mumbai, Maharashtra - 2.3 km",
    specializations: ["Child Health", "Nutrition", "General Medicine"],
    needs: ["Vitamins", "Antibiotics", "Pain Relief"],
    rating: 4.8,
    verified: true,
  },
  {
    name: "Smile Foundation",
    location: "Delhi, India - 5.1 km",
    specializations: ["Women Health", "Child Health"],
    needs: ["Antibiotics", "Supplements"],
    rating: 4.6,
    verified: true,
  },
  {
    name: "Health for All",
    location: "Pune, Maharashtra - 7.8 km",
    specializations: ["General Medicine", "Community Health"],
    needs: ["Pain Relief", "Cough Syrup"],
    rating: 4.4,
    verified: false,
  },
];

const filters = ["All", "Verified", "Child Health", "Nutrition", "General Medicine", "Women Health"];

const NGOMap = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredNGOs = ngoList.filter((ngo) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Verified") return ngo.verified;
    return ngo.specializations.includes(selectedFilter);
  }).filter((ngo) =>
    ngo.name.toLowerCase().includes(search.toLowerCase()) ||
    ngo.location.toLowerCase().includes(search.toLowerCase()) ||
    ngo.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">NGO Partners</h1>
          <div className="text-gray-500 text-base">Find verified NGOs near you</div>
        </div>
        <SearchFilterBar
          filters={filters}
          selected={selectedFilter}
          onChange={setSelectedFilter}
          onSearch={setSearch}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {filteredNGOs.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 text-lg py-12">No NGOs found matching your criteria.</div>
          ) : (
            filteredNGOs.map((ngo) => (
              <NGOCard key={ngo.name} {...ngo} />
            ))
          )}
        </div>
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="text-2xl font-bold text-gradientFrom mb-2">200+ Verified NGOs</div>
            <div className="text-gray-500 mb-2">50+ Cities Covered</div>
            <div className="text-gradientFrom font-bold text-lg">100K+ People Served</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="text-2xl font-bold text-gradientFrom mb-2">24/7</div>
            <div className="text-gray-500 mb-2">Support Available</div>
            <div className="text-gradientFrom font-bold text-lg">Get Help Anytime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOMap; 