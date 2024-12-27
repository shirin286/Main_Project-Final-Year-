import React, { useState } from "react";
import { PhishingHeader } from "../components/Header";
import axios from "axios";

const Phishing = () => {
  const [emailContent, setEmailContent] = useState(""); // State to store the email content
  const [result, setResult] = useState(""); // State to store the backend response
  const [isSafe, setIsSafe] = useState(null) // State to check if backend result is safe or not

  // Function to handle form submission
  const handleCheck = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/phishing_analyze", {
        emailContent: emailContent,
      });
      const { warnings, urls } = response.data; // Extract warnings and URLs from response
      let resultMessage = warnings.join(", ");
      if (urls.length > 0) {
        resultMessage += ` Detected URLs: ${urls.join(", ")}`;
      }
      setResult(resultMessage || "No issues detected.");
      setIsSafe(warnings.length === 0)
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setResult("An error occurred while analyzing the email.");
      setIsSafe(null)
    }
  };
  

  return (
    <div>
      <div>
        <PhishingHeader />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
          Maximize Your Online Security
        </h1>
        <p className="text-gray-600 max-w-xl mb-8">
          Empower yourself with our expert-curated phishing detection resources.
          From spotting suspicious emails to safeguarding your digital identity.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full flex flex-col">
          <h2 className="text-lg font-bold mb-4">Enter your Email here</h2>
          <textarea
            className="my-4 h-96 w-full border-2 border-black p-2"
            placeholder="Paste here"
            value={emailContent} // Controlled input for email content
            onChange={(e) => setEmailContent(e.target.value)}
          ></textarea>
          <button
            onClick={handleCheck} // Call the handleCheck function on click
            className="bg-cyan-500 text-white px-3 py-2 rounded-md shadow-md w-1/5 mx-auto hover:bg-cyan-600"
          >
            Check
          </button>
          {result && (
            <p className={`mt-4 text-gray-700 font-semibold rounded-md py-2 ${isSafe === null
              ? "bg-gray-500"
              :isSafe ? "bg-green-500"
              :"bg-red-500"
            }`}>{result}</p> 
          )}
        </div>
      </main>
    </div>
    </div>
  );
};

export default Phishing;
