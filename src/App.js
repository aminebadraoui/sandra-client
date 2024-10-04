import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/03.blocks/Navbar';
import RegisterModal from './components/features/RegisterModal';
import SigninModal from './components/features/SigninModal';
import UserHomePage from './pages/UserHomePage';
import AdminDashboard from './pages/Admin Dashboard/AdminDashboard';
import useModalStore from './state/modalStore';
import useUserStore from './state/userStore';
import AddServiceListingForm from './components/forms/serviceListing/AddServiceListingForm';
import ManageListingsPage from './pages/Manage Listing/ManageListingsPage';
import EditServiceListingForm from './components/forms/serviceListing/EditServiceListingForm';
import LandingPage from './pages/01.Public/01.Landing Page/LandingPage';
import ServiceProviderDetailPage from './pages/service provider/ServiceProviderDetailPage'
import ServiceDetailPage from './pages/service provider/ServiceDetailPage';
import AppLayout from './components/01.layout/AppLayout';

function App() {
  const showLoginModal = useModalStore(state => state.showLoginModal)
  const showRegisterModal = useModalStore(state => state.showRegisterModal)
  const { user, isLoading } = useUserStore()
  const initializeUser = useUserStore(state => state.initializeUser)

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  console.log("Rendering App, user:", user, "isLoading:", isLoading);

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Routes>
        <Route path="/" element={user ? <UserHomePage /> : <LandingPage />} />

        { /* Service Listing */}

        {/* Manage Service */}
        <Route
          path="/manage-listings/*"
          element={user ? <ManageListingsPage /> : <Navigate to="/" />}
        />

        {/* Add Service */}
        <Route
          path="/add-service-listing"
          element={user && user.role === "serviceProvider" ? <AddServiceListingForm /> : <Navigate to="/" />}
        />

        {/* Edit Service */}
        <Route path="/edit-service-listing/:id" element={<EditServiceListingForm />} />

        <Route path="/service-provider/:id" element={<ServiceProviderDetailPage />} />

        <Route path="/service/:id" element={<ServiceDetailPage />} />

        <Route
          path="/account"
          element={user ? <div>Account Page (User: {user.email})</div> : <Navigate to="/" />}
        />
        <Route path="/help-center" element={<div>Help Center Page</div>} />
        <Route
          path="/admin/*"
          element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>

    );
  };

  return (
    <Router>
      <AppLayout>
        <Navbar />
        {showLoginModal && !showRegisterModal && <SigninModal />}
        <div className="flex flex-col min-h-screen">
          {showRegisterModal && !showLoginModal && <RegisterModal />}
          {/* {true && <RegisterModal />} */}

          <div className="mt-[80px]">
            {renderContent()}
          </div>
        </div>
      </AppLayout>

    </Router>
  );
}

export default App;
