import React, { useState, useEffect } from "react";
import InfoCard from "./infocard";



const PersonalUsageSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const cards = [
    {
      title: "Phishing",
      description: "Learn how to detect and avoid phishing attacks effectively.",
      bgColor: "bg-blue-100",
      img: "https://www.clickcease.com/blog/wp-content/uploads/2020/12/phishing-1024x1024.jpg",
      page: "/phishing"
    },
    {
      title: "Smishing",
      description: "Understand SMS-based phishing and protect your data.",
      bgColor: "bg-green-100",
      img: "https://news.loaris.com/wp-content/uploads/2022/06/smishing-attacks-tips-for-protection.jpg",
      page: "/smishing"
    },
    {
      title: "URL Encoding and Decoding",
      description: "Convert URLs into encoded formats and decode them easily.",
      bgColor: "bg-yellow-100",
      img: "https://qph.cf2.quoracdn.net/main-qimg-cf72a3df64a27806159116bc58a2dd28",
      page: "/urlencoding"
    },
  ];

  useEffect(() => {
    // Check if screen width is less than 700px
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 700);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white bg-opacity-90 text-black w-full px-6 py-12 rounded-xl shadow-lg max-w-screen-lg mt-12 mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Personal Usage</h2>
      <p className="text-center text-gray-600 mb-8">
        Explore tools to enhance your personal online security.
      </p>

      {/* Responsive Grid */}
      <div className={`flex ${isMobileView ? "flex-col gap-6" : "justify-center gap-4"}`}>
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            title={card.title}
            description={card.description}
            bgColor={card.bgColor}
            img={card.img} // Pass img here
            isExpanded={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            isMobileView={isMobileView} // Pass mobile view flag
            page={card.page}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalUsageSection;
