import React, { useState } from "react";
import { SOAHeader } from "../components/Header";
import axios from "axios";

const SOA = () => {
  const [domain, setDomain] = useState(""); // State to store the domain name
  const [result, setResult] = useState(null); // State to store the backend response
  const [error, setError] = useState(null); // State to store error messages

  // Function to handle the analysis
  const handleAnalyze = async () => {
    if (!domain.trim()) {
      setError("Please enter a domain name.");
      setResult(null);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/query-soa", {
        domain: domain.trim(), // Send the domain name to the backend
      });
      setResult(response.data); // Set the result from the backend
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred while querying the SOA record.");
      setResult(null);
    }
  };

  return (
    <div>
      <div>
        <SOAHeader />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
          Analyze SOA Records
        </h1>
        <p className="text-gray-600 max-w-xl mb-8">
          Enter a domain name to fetch its SOA (Start of Authority) records and ensure proper DNS configuration.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full flex flex-col">
          <h2 className="text-lg font-bold mb-4">Enter the domain name</h2>
          <input
            className="my-4 w-full border-2 border-black p-2"
            placeholder="e.g.: example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)} // Update the domain state
            type="text"
          />
          <button
            onClick={handleAnalyze} // Call the handleAnalyze function
            className="bg-cyan-500 text-white px-3 py-2 rounded-md shadow-md w-1/5 mx-auto hover:bg-cyan-600"
          >
            Analyze
          </button>

          {/* Display the error message */}
          {error && <p className="mt-4 text-red-600">{error}</p>}

          {/* Display the result */}
          {result && result.status === "success" && (
            <div className="mt-4 bg-green-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-green-700">SOA Records:</h3>
              {result.SOA_Records.map((record, index) => (
                <div key={index} className="mt-2 text-left">
                  <p>
                    <strong>Primary NS:</strong> {record.Primary_NS}
                  </p>
                  <p>
                    <strong>Responsible Party:</strong> {record.Responsible_Party}
                  </p>
                  <p>
                    <strong>Serial:</strong> {record.Serial}
                  </p>
                  <p>
                    <strong>Refresh:</strong> {record.Refresh}
                  </p>
                  <p>
                    <strong>Retry:</strong> {record.Retry}
                  </p>
                  <p>
                    <strong>Expire:</strong> {record.Expire}
                  </p>
                  <p>
                    <strong>Minimum:</strong> {record.Minimum}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Display error from backend */}
          {result && result.status === "error" && (
            <div className="mt-4 bg-red-100 p-4 rounded-md">
              <p className="text-red-700">{result.message}</p>
            </div>
          )}
        </div>
      </main>
    </div>
    </div>
  );
};

export default SOA;
