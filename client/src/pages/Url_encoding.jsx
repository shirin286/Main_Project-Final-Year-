import React, { useState } from "react";
import { URLHeader } from "../components/Header";
import axios from "axios";

const Url_encoding = () => {
  const [selectedOption, setSelectedOption] = useState("1"); // For dropdown selection
  const [inputValue, setInputValue] = useState(""); // For URL input
  const [result, setResult] = useState(""); // To display encoded/decoded result

  // Function to handle Submit based on user selection
  // const handleSubmit = async () => {
  //   if (selectedOption === "3") {
  //     setResult("You have exited the operation.");
  //     return;
  //   }

  //   try {
  //     // Determine the backend route based on the selected option
  //     const endpoint =
  //       selectedOption === "1"
  //         ? "http://127.0.0.1:5000/encode"
  //         : "http://127.0.0.1:5000/decode";

  //     // Make a POST request to the backend with the URL
  //     const response = await axios.post(endpoint, {
  //       url: inputValue,
  //     });

  //     // Update the result with the response from the backend
  //     setResult(response.data.result || "Operation successful!");
  //   } catch (error) {
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //     setResult("An error occurred. Please try again.");
  //   }
  // };
  const handleSubmit = async () => {
    if (selectedOption === "3") {
      setResult("You have exited the operation.");
      return;
    }

    try {
      // Define API endpoints based on user selection
      const endpoint =
        selectedOption === "1"
          ? "http://localhost:5000/api/encode" // Encode endpoint
          : "http://localhost:5000/api/decode"; // Decode endpoint

      // Make POST request to the backend with the input URL
      const response = await axios.post(endpoint, {
        url: inputValue,
      });

      // Access correct key based on selected option
      if (selectedOption === "1" && response.data.encoded_url) {
        setResult(response.data.encoded_url); // Set the encoded URL
      } else if (selectedOption === "2" && response.data.decoded_url) {
        setResult(response.data.decoded_url); // Set the decoded URL
      } else {
        setResult("Error: Invalid response from backend.");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <URLHeader />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
          Optimize Your Communication
        </h1>
        <p className="text-gray-600 max-w-xl mb-8">
          Empower yourself with our expert-curated URL encoding and decoding
          resources. Learn to encode special characters, decode URLs accurately,
          and ensure seamless data transmission in your online interactions.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full flex flex-col">
          <h2 className="text-lg font-bold mb-4">Select an Option</h2>

          {/* Dropdown for operation selection */}
          <select
            className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setInputValue(""); // Reset input value
              setResult(""); // Reset result
            }}
          >
            <option value="1">Encode a URL</option>
            <option value="2">Decode a URL</option>
            <option value="3">Exit</option>
          </select>

          {/* Input field appears only for Encode and Decode options */}
          {selectedOption !== "3" && (
            <>
              <textarea
                className="my-4 h-32 w-full border-2 border-black p-2"
                placeholder={
                  selectedOption === "1"
                    ? "Enter the URL to encode"
                    : "Enter the URL to decode"
                }
                value={inputValue} // Controlled input for URL
                onChange={(e) => setInputValue(e.target.value)}
              ></textarea>
              <button
                onClick={handleSubmit} // Call handleSubmit when button is clicked
                className="bg-cyan-500 text-white px-3 py-2 rounded-md shadow-md w-1/5 mx-auto hover:bg-cyan-600"
              >
                Submit
              </button>
            </>
          )}

          {/* Display the result */}
          {result && (
            <p className="mt-4 text-gray-700 font-semibold rounded-md py-2 bg-gray-200">
              {result}
            </p>
          )}
        </div>
      </main>
    </div>
    </div>
  );
};

export default Url_encoding;
