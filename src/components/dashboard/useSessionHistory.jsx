import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UseSessionExpiration = () => {
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const checkExpiration = () => {   console.log('hello')
      const token = sessionStorage.getItem('api_token');
      const expirationTime = sessionStorage.getItem('expirationTime');
      const timerStart = parseInt(sessionStorage.getItem('timerStart'), 10); // Get timerStart from sessionStorage
      const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds
      
      if (token && expirationTime) {
        const timeExpired = currentTimeInSeconds - timerStart;
        if (timeExpired > expirationTime) {
          console.log("timeExpired",expirationTime);
          // Token has expired
          setIsExpired(true);
          // Redirect to sign-in page
          navigate('/corporate/signin'); // Use navigate function for navigation
        }
      } else {
        // Token or expiration time not found
        setIsExpired(true);
        // Redirect to sign-in page
        navigate('/corporate/signin'); // Use navigate function for navigation
      }
    };

    const intervalId = setInterval(checkExpiration, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup
  }, [navigate]);

  return isExpired;
};

export default UseSessionExpiration;
