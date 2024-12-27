import React, { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is phishing?",
      answer:
        "Phishing is a type of cyber attack where attackers impersonate trusted entities to steal sensitive information.",
    },
    {
      question: "What are CAA records?",
      answer:
        "CAA records are DNS records that specify which certificate authorities (CAs) are allowed to issue certificates for a domain.",
    },
    {
      question: "How do I protect my business online?",
      answer:
        "Implement security measures like strong passwords, regular updates, and monitoring tools to protect your business.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 w-full px-4 sm:px-6 py-8 sm:py-12 rounded-xl shadow-lg max-w-screen-lg mt-8 mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center"
            >
              <span className="text-base sm:text-lg font-medium">
                {faq.question}
              </span>
              <span className="text-lg sm:text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            <div
              className={`mt-3 text-sm sm:text-base text-gray-600 transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-screen" : "max-h-0 overflow-hidden"
              }`}
            >
              {openIndex === index && (
                <p className="pt-2">{faq.answer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
