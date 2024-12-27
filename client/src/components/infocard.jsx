import React from "react";
import { Link } from 'react-router-dom';

const InfoCard = ({ title, description, bgColor, isExpanded, onMouseEnter, onMouseLeave, img, isMobileView, page }) => {
  return (
    <div
      className={`${bgColor} rounded-lg shadow-md p-6 text-center transition-all duration-300`}
      style={{
        flex: isMobileView ? 1 : isExpanded ? 3 : 1, // Flex behavior for large screens
        transform: isMobileView && isExpanded ? "scaleY(1.1)" : "scaleY(1)", // Scale vertically for mobile
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={`text-gray-600 transition-opacity duration-300`}>{description}</p>
      
      {/* Conditionally render image only when expanded */}
      {isExpanded && img && (
        <div className="mt-4">
          <img src={img} alt={title} className="w-auto h-48 mx-auto rounded-md" />
        </div>
      )}

      {isExpanded && (
        <Link to={page}>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Scan →
        </button>
        </Link>
      )}
    </div>
  );
};

export default InfoCard;
