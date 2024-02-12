import React, { useEffect, useState,useRef } from 'react';
import './dashboard.css';
import NavBar from './navbar';
import PincodeSearch from './pincodeSearch';
import AddressCard from './addressCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UseSessionExpiration from './useSessionHistory';

function CorporateDashboard() {
  const isExpired = UseSessionExpiration();
  const [companyName, setCompanyName] = useState("");
  const [proceedToAddress, setProceedToAddress] = useState(false); // Initialize state for proceeding to address
  const addressCardRef = useRef(null); // Create a ref for the AddressCard element

  useEffect(() => {
    if (isExpired) {
      return <Link className='link' to="/corporate/signin"></Link>;
    }
    const fetchData = async () => {
      try {
        // Retrieve the api_token from the session storage
        const apiToken = sessionStorage.getItem('api_token');

        if (!apiToken) {
          // Handle the case where api_token is not available
          console.error('No api_token found in session storage');
          return;
        }

        const response = await axios.post(
          'https://backend.courierbote.com/api/corporateuser/get-user-by-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        console.log(response.data);
        setCompanyName(response.data.comapanyName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='dashboard-landing'>
        <NavBar companyName={companyName} />
        <div className='pincode-search'>
          <PincodeSearch setProceedToAddress={setProceedToAddress} /> 
        </div>
      </div>
      {proceedToAddress && 
       <div id="address-card" ref={addressCardRef}> {/* Assign the ref to the wrapping element */}
       <AddressCard />
     </div>} 
    </div>
  );
}

export default CorporateDashboard;
