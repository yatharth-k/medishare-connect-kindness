
import React from "react";
import { Helmet } from "react-helmet-async";
import GradientButton from "../components/ui/GradientButton";
import StatCard from "../components/ui/StatCard";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { FaPills, FaHandsHelping, FaUsers, FaCheck, FaShieldAlt, FaRegHeart, FaRegSmile } from "react-icons/fa";

const stats = [
  { icon: <FaPills />, stat: "50K+", label: "Medicines Donated" },
  { icon: <FaUsers />, stat: "200+", label: "NGO Partners" },
  { icon: <FaHandsHelping />, stat: "100K+", label: "Lives Impacted" },
];

const Index = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans flex flex-col">
    <Helmet>
      <title>MediShare – Donate Unused Medicines, Save Lives</title>
      <meta name="description" content="Transform your unused, unexpired medicines into hope for underserved communities. Connect with verified NGOs and track your impact in real-time with MediShare." />
      <meta property="og:title" content="MediShare – Donate Unused Medicines, Save Lives" />
      <meta property="og:description" content="Transform your unused, unexpired medicines into hope for underserved communities. Connect with verified NGOs and track your impact in real-time with MediShare." />
      <meta property="og:image" content="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <Header />
    <main className="flex flex-col items-center justify-center text-center py-16 px-4 flex-1 w-full">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
          Donate Unused Medicines, <span className="text-gradientFrom">Save Lives</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your unused, unexpired medicines into hope for underserved communities. Connect with verified NGOs and track your impact in real-time.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
          <GradientButton className="text-lg px-8 py-4">Dashboard</GradientButton>
          <GradientButton className="text-lg px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500">Partner with Us</GradientButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          {stats.map((s) => (
            <StatCard key={s.label} icon={s.icon} stat={s.stat} label={s.label} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full max-w-6xl mx-auto py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaRegHeart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Register</h3>
            <p className="text-gray-600">Sign up as a donor or NGO with verified credentials.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaPills className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. List or Find</h3>
            <p className="text-gray-600">Donors list medicines, NGOs browse available donations.</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaShieldAlt className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Verify</h3>
            <p className="text-gray-600">Our team verifies medicine quality and safety standards.</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">4. Deliver</h3>
            <p className="text-gray-600">Safe delivery to NGOs and communities in need.</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="w-full max-w-6xl mx-auto py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Partners</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <FaRegSmile className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Akshaya Patra Foundation</h3>
            <p className="text-gray-600 text-center">Serving underprivileged children with healthcare and nutrition programs across Mumbai slums.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <FaRegSmile className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Smile Foundation</h3>
            <p className="text-gray-600 text-center">Empowering women and children through health and education initiatives in India.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <FaRegSmile className="text-purple-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Health for All</h3>
            <p className="text-gray-600 text-center">Promoting community health and access to essential medicines in Maharashtra.</p>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="w-full max-w-6xl mx-auto py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Stories of Impact</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2 text-gradientFrom">A Donor's Journey</h3>
            <p className="text-gray-600 mb-4">“I never realized how much of a difference my unused medicines could make. MediShare made it easy to donate and track my impact.”</p>
            <span className="text-sm text-gray-400">— Priya, Mumbai</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2 text-gradientFrom">NGO Success Story</h3>
            <p className="text-gray-600 mb-4">“With MediShare, we reached more children in need and improved our medicine supply chain.”</p>
            <span className="text-sm text-gray-400">— Akshaya Patra Foundation</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full max-w-4xl mx-auto py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6 text-left">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">What types of medicines can be donated?</h3>
            <p className="text-gray-600">We accept unopened, unexpired prescription and over-the-counter medicines. All donations must be in their original packaging with clear labeling and must have at least 6 months until expiration.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">How do you ensure medicine safety?</h3>
            <p className="text-gray-600">Our certified pharmacists review all donations, checking expiration dates, packaging integrity, and storage conditions. We also maintain cold chain logistics for temperature-sensitive medications.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Can individuals donate directly to specific NGOs?</h3>
            <p className="text-gray-600">Yes! You can browse our network of verified NGOs and choose specific organizations to support, or let our algorithm match your donations with the most urgent needs.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">How are NGOs verified?</h3>
            <p className="text-gray-600">All NGOs undergo a thorough verification process including legal documentation review, site visits, and ongoing monitoring to ensure they meet our standards for legitimate charitable work.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="w-full max-w-2xl mx-auto py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-4 text-gradientFrom">Contact Us</h2>
          <p className="text-gray-600 mb-4">Have questions or want to get in touch? Reach out to us directly:</p>
          <div className="flex flex-col gap-2 mb-4">
            <a href="mailto:Yatharth00kherodia@gmail.com" className="text-blue-600 hover:underline text-lg">Yatharth00kherodia@gmail.com</a>
            <a href="tel:+917023733199" className="text-blue-600 hover:underline text-lg">+91 7023733199</a>
          </div>
          <p className="text-gray-500 text-sm">We’ll get back to you as soon as possible!</p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Index;
