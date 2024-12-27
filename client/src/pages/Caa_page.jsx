import React, { useState } from "react";
import { CAAHeader } from "../components/Header";
import axios from "axios";

const Caa_page = () => {
  const [domain, setDomain] = useState(""); // For domain input
  const [result, setResult] = useState(null); // To display CAA records (initialized to null)
  const [error, setError] = useState(""); // To handle errors

  const handleSubmit = async () => {
    try {
      // Make a POST request to the backend with the domain input
      const response = await axios.post("http://127.0.0.1:5000/api/query-caa", {
        domain,
      });

      if (response.data && response.data.caaRecords) {
        setResult(response.data.caaRecords); // Set the CAA records from backend
        setError(""); // Clear any previous errors
      } else {
        setResult(null);
        setError("No CAA records found for this domain.");
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);

      // Handle specific errors
      if (err.response && err.response.data) {
        if (err.response.data.error) {
          setError(err.response.data.error); // Show error message from backend
        } else {
          setError(
            "An error occurred while fetching CAA records. Please try again."
          );
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }

      setResult(null); // Clear result when there is an error
    }
  };

  return (
    <div>
      <div>
        <CAAHeader />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
          Query CAA Records
        </h1>
        <p className="text-gray-600 max-w-xl mb-8">
          Enter a domain to retrieve its Certificate Authority Authorization
          (CAA) records. Ensure the domain is valid to get accurate results.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full flex flex-col">
          <h2 className="text-lg font-bold mb-4">Domain Query</h2>

          {/* Input field for domain */}
          <input
            type="text"
            className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full"
            placeholder="Enter a domain (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <button
            onClick={handleSubmit} // Call handleSubmit when button is clicked
            className="bg-cyan-500 text-white px-3 py-2 rounded-md shadow-md w-1/5 mx-auto hover:bg-cyan-600"
          >
            Submit
          </button>

          {/* Display the result */}
          {result && (
            <div className="mt-4 text-gray-700 font-semibold rounded-md py-2 bg-gray-200">
              <h3 className="text-lg font-bold mb-2">CAA Records:</h3>
              <ul className="list-disc pl-6">
                {result.map((record, index) => (
                  <li key={index}>
                    <strong>Flag:</strong> {record.flag} | <strong>Tag:</strong>{" "}
                    {record.tag} | <strong>Value:</strong> {record.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display error message */}
          {error && (
            <p className="mt-4 text-red-600 font-semibold rounded-md py-2">
              {error}
            </p>
          )}
        </div>
      </main>
    </div>
    </div>
  );
};

export default Caa_page;
