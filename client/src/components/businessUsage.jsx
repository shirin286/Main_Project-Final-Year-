import React, { useState, useEffect } from "react";
import InfoCard from "./infocard";

const BusinessUsageSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);

    const businessCards = [
        {
            title: "CAA Records",
            description: "Secure your domains by understanding CAA records.",
            bgColor: "bg-yellow-100",
            img: "https://tse4.mm.bing.net/th?id=OIP.YiHKFJqsnwW19bfWqcLW4QHaEK&pid=Api&P=0&h=180",
            page: "/caa"
        },
        {
            title: "SOA Records",
            description: "Learn about SOA records and domain hierarchy management.",
            bgColor: "bg-blue-100",
            img: "https://static.dns-lookup.net/soa-record/soa-1715944560.png",
            page: "/soa"
        },
        {
            title: "PTR Records",
            description: "Understand PTR records and their role in reverse DNS.",
            bgColor: "bg-red-100",
            img: "https://www.cloudns.net/blog/wp-content/uploads/2018/01/rDNS.png",
            page: "/ptr"
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
            <h2 className="text-3xl font-bold mb-2 text-center">Business Usage</h2>
            <p className="text-center text-gray-600 mb-8">
                Explore business tools that help optimize performance and growth.
            </p>

            {/* Responsive Grid for Business Cards */}
            <div className={`flex ${isMobileView ? "flex-col gap-6" : "justify-center gap-4"}`}>
                {businessCards.map((card, index) => (
                    <InfoCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        bgColor={card.bgColor}
                        img={card.img} // Pass the image here
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

export default BusinessUsageSection;
