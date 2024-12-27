import React from "react";
import "../index.css";
import PersonalUsageSection from "./personalUsage";
import BusinessUsageSection from "./businessUsage";
import Navbar from "./navbar";
import FAQSection from "./FAQ";
import Footer from "./footer";

const BlendedImage = () => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/2655649.jpg'), linear-gradient(to bottom, rgba(0,0,0,0) 70%, black 100%)`,
        backgroundBlendMode: "overlay",
      }}
    />
  );
};

const UserDashboard = () => {
  const username = "Srinjay Fadikar";

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="relative h-screen">
        <BlendedImage />
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white font-sans px-4">
          <div className="bg-black bg-opacity-50 px-8 py-6 sm:px-12 sm:py-10 md:px-16 md:py-12 rounded-2xl text-center w-full max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">User Dashboard</h1>
            <p className="text-sm md:text-lg">
              Welcome, <span className="text-blue-400">{username}</span>
            </p>
            <button
              className="mt-6 px-8 py-2 md:px-10 md:py-3 bg-white text-black rounded-full text-sm md:text-lg hover:bg-gray-200 transition duration-300"
              onClick={() => alert("Logged out")}
            >
              Logout
            </button>
            <p className="mt-4 text-xs md:text-sm text-gray-400">
              Manage your account settings
            </p>
          </div>
        </div>
      </div>

      <div className="px-4">
        <PersonalUsageSection />
        <BusinessUsageSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;
