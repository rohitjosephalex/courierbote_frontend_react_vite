import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Landing';
import SignUp from './components/signup/SignUp';
import CorporateDashboard from './components/dashboard/CorperateDashboard';
// Placeholder component for unknown paths
const NotFound = () => {
  return <div>Page Not Found</div>;
};

// Custom PrivateRoute component for handling authentication
const PrivateRoute = ({ element, ...rest }) => {
  const apiToken = sessionStorage.getItem('api_token');
  return apiToken ? element : <Navigate to="/corporate/signin" />;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/corporate/signin" element={<SignUp Active='signin' />} />
          <Route path="/corporate/signup" element={<SignUp Active='signup' />} />
          <Route path="/corporate/dashboard" element={<PrivateRoute element={<CorporateDashboard />} />} />
          <Route path="*" element={<NotFound />} /> {/* Default route for unknown paths */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
