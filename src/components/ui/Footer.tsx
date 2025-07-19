import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8z" fill="#22c55e"/><path d="M12 6.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5S10.62 8.5 12 8.5s2.5 1.12 2.5 2.5S13.38 13.5 12 13.5z" fill="#3b82f6"/></svg>
            </span>
            <span className="text-xl font-bold">MediShare</span>
          </div>
          <p className="text-gray-400">Connecting unused medicines with communities in need, one donation at a time.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Platform</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#for-donors" className="hover:text-white transition-colors">For Donors</a></li>
            <li><a href="#for-ngos" className="hover:text-white transition-colors">For NGOs</a></li>
            <li><a href="#safety" className="hover:text-white transition-colors">Safety Standards</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#guidelines" className="hover:text-white transition-colors">Guidelines</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#cookie" className="hover:text-white transition-colors">Cookie Policy</a></li>
            <li><a href="#compliance" className="hover:text-white transition-colors">Compliance</a></li>
          </ul>
        </div>
      </div>
      <div className="my-8 border-t border-gray-800" />
      <div className="text-center text-gray-400">
        <p>&copy; 2024 MediShare. All rights reserved. Made with <span className="text-red-400">❤️</span> for global health.</p>
      </div>
    </div>
  </footer>
);

export default Footer; 