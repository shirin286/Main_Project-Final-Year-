import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'
import UserDashboard from './components/username'
import PtrPage from './pages/PtrPage'
import SmishingPage from './pages/SmishingPage';
import PhishingPage from './pages/phishing'
import Url_encoding from './pages/Url_encoding';
import SOA from './pages/SOA';
import Caa_page from './pages/Caa_page';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/phishing" element={<PhishingPage />} />
        <Route path="/smishing" element={<SmishingPage />} />
        <Route path="/ptr" element={<PtrPage />} />
        <Route path="/urlencoding" element={<Url_encoding />} />
        <Route path="/soa" element={<SOA />} />
        <Route path="/caa" element={<Caa_page />} />
      </Routes>
    </Router>
  );
}

export default App
