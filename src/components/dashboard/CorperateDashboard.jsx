import React, { useEffect, useState, useRef } from 'react';
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
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
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
        console.log(response.data.Address);
        setCompanyName(response.data.comapanyName);
        setAddressLine1(response.data.Address.addressLine1);
        setAddressLine2(response.data.Address.addressLine2);
        setCity(response.data.Address.city);
        setEmail(response.data.Address.email);
        setName(response.data.Address.name);
        setPhoneNumber(response.data.Address.phoneNumber);
        setPincode(response.data.Address.pincode);
        setState(response.data.Address.state);
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
          <PincodeSearch setProceedToAddress={setProceedToAddress} PickPincode={pincode}/>
        </div>
      </div>
      {proceedToAddress &&
        <div id="address-card" ref={addressCardRef}> {/* Assign the ref to the wrapping element */}
          <AddressCard name={name} add1={addressLine1} add2={addressLine2} phoneNumber={phoneNumber} email={email} city={city} pincode={pincode} state={state} />
        </div>}
    </div>
  );
}

export default CorporateDashboard;
