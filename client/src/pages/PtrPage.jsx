import React, { useState } from 'react';
import {PtrHeader} from '../components/Header';

const PtrPage = () => {
  const [isIpSelected, setIsIpSelected] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(''); // State to hold the backend result

  const handleCheckboxChange = (event) => {
    setIsIpSelected(event.target.checked); // Toggle between IP and Domain
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAnalyseClick = async () => {
    const data = {
      input: inputValue,
      isIp: isIpSelected, // Send the flag that tells the back-end whether it's an IP or Domain
    };

    try {
      const response = await fetch('http://localhost:5000/api/ptr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result)
      setResult(result.message); // Display the result from the backend
    } catch (error) {
      setResult('Error fetching data from the server.');
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <div className="row" style={{ backgroundColor: 'black' }}>
        <PtrHeader />
      </div>
      <div className="row desc mt-5">
        <div className="col mt-5">
          <div className="container">
            <div className="row heading text-center">
              <div className="col-3"></div>
              <div className="col-sm-12 col-md-6">
                <h1 className='text-4xl font-bold text-center text-gray-800 leading-tight mb-4'>PTR Records: A Gateway for Phishing Scams</h1>
                <p className="mt-4 text-muted">
                  Discover the latest techniques to identify and prevent phising attacks. our comprehensive guide covers SMS,URL Analysis and social engineering tacticts to keep your online activities safe.
                           </p>
                <div className="btn btn-danger mt-3">User Guidelines</div>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="row gap" style={{ minHeight: '500px' }}></div>

      <div className="row cardbody mt-5">
        <div className="col mt-3">
          <div className="container">
            <div className="row heading text-center">
              <div className="col-3"></div>
              <div className="col-sm-12 col-md-6">
                <h3></h3>
                <p className="mt-4 text-muted">
                  
                </p>
                <div className="row card mt-5 mb-5">
                  <div className="col mt-4 mb-4">
                    <div className="row">
                      <h5>Enter {isIpSelected ? 'IP address' : 'Domain name'}</h5>
                      <div className="form-check mt-3">
                      <input
                        type="checkbox"
                        className="form-check-input ms-2"
                        id="ipCheckbox"
                        checked={isIpSelected}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="ipCheckbox">
                        Use IP address
                      </label>
                    </div>
                      <div className="input-group mb-3 mt-3">
                        <textarea
                          className="form-control"
                          placeholder={isIpSelected ? 'e.g.: 192.168.1.1' : 'e.g.: user@example.com'}
                          rows="10"
                          aria-label="Recipient's input"
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col">
                        <button className="btn btn-info" onClick={handleAnalyseClick}>
                          Scan
                        </button>
                      </div>
                      <div className="row mt-4">
                        <div className="col result">
                          <h5>Result: {result}</h5>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PtrPage;
