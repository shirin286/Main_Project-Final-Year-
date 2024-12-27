import React from 'react';

const SmishingHeader = () => {
  return (
    <div>
      <div class="row align-items-center pt-3 pb-3">
          <div class="col-md-2 left text-center text-white">SPAM ANALYSER</div>
          <div className="col-md-9"></div>
          <div class="col-md-1 right">
            <div class="btn btn-warning">Shirin</div>
          </div>
        </div>
    </div>
  )
}
const PhishingHeader = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <header className="w-full bg-white shadow-md">
          <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="text-xl font-bold">Spam Analyser</div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md">Srinjay Fadikar</button>
          </nav>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 leading-tight mb-4">
            Phishing Detection: Stay <br /> Vigilant, Avoid Scams
          </h1>
          <p className="text-gray-600 text-center max-w-xl mb-8">
            Discover the latest techniques to identify and prevent phishing
            attacks. Our comprehensive guide covers email verification, URL
            analysis, and social engineering tactics to keep your online activities safe.
          </p>
          <button className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600">
            User Guidelines
          </button>
        </main>
      </div>
    </div>
  );
}
const PtrHeader = () => {
  return (
    <div>
      <div class="row align-items-center pt-3 pb-3">
          <div class="col-md-2 left text-center text-white">SPAM ANALYSER</div>
          <div className="col-md-9"></div>
          <div class="col-md-1 right">
            <div class="btn btn-warning">Shirin</div>
          </div>
        </div>
    </div>
  )
}
const URLHeader = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <header className="w-full bg-white shadow-md">
          <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="text-xl font-bold">Spam Analyser</div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
              Shibam Chakraborty
            </button>
          </nav>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 leading-tight mb-4">
            URL Encoding and Decoding: Simplify <br /> Data Transmission, Ensure
            Accuracy
          </h1>
          <p className="text-gray-600 text-center max-w-xl mb-8">
            Learn how URL encoding and decoding play a vital role in secure and
            accurate data transmission. Our in-depth guide explains the process
            of encoding special characters, decoding URLs, and their
            significance in ensuring seamless communication between servers and
            browsers. Stay informed and enhance your web development or
            cybersecurity skills today!
          </p>
          <button className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600">
            User Guidelines
          </button>
        </main>
      </div>
    </div>
  );
}
const SOAHeader = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <header className="w-full bg-white shadow-md">
          <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="text-xl font-bold">Spam Analyser</div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md">Srinjay Fadikar</button>
          </nav>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 leading-tight mb-4">
            SOA Validation: Ensure <br /> Accuracy, Avoid Discrepancies
          </h1>
          <p className="text-gray-600 text-center max-w-xl mb-8">
          Explore the latest strategies for accurate SOA verification. Our detailed guide covers DNS validation, record consistency checks, and troubleshooting techniques to ensure seamless domain management.
          </p>
          <button className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600">
            User Guidelines
          </button>
        </main>
      </div>
    </div>
  );
}
const CAAHeader = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <header className="w-full bg-white shadow-md">
          <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="text-xl font-bold">Spam Analyser</div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
              Shibam Chakraborty
            </button>
          </nav>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 leading-tight mb-4">
            CAA: Strengthening <br /> Web Security, Preventing Data Breaches
          </h1>
          <p className="text-gray-600 text-center max-w-xl mb-8">
            Learn how the Certificate Authority Authorization (CAA) helps
            protect your website from unauthorized certificate issuers. This
            comprehensive guide explains the CAA's role in ensuring that only
            trusted Certificate Authorities (CAs) can issue certificates for
            your domain. By implementing CAA, you can enhance the security of
            your website, mitigate risks of data breaches, and ensure that your
            users' information remains protected. Stay ahead of cyber threats
            and boost your web security knowledge today!
          </p>
          <button className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600">
            User Guidelines
          </button>
        </main>
      </div>
    </div>
  );
}

export {SmishingHeader, PhishingHeader, PtrHeader, URLHeader, SOAHeader, CAAHeader};
