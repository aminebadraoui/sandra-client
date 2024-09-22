import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/features/Navbar';
import RegisterModal from './components/features/RegisterModal';
import SigninModal from './components/features/SigninModal';
import UserHomePage from './components/pages/UserHomePage';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import useModalStore from './state/modalStore';
import useUserStore from './state/userStore';
import AddServiceListingForm from './components/forms/serviceListing/AddServiceListingForm';
import ManageListingsPage from './components/pages/ManageListingsPage';
import EditServiceListingForm from './components/forms/serviceListing/EditServiceListingForm';
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
        <Route path="/" element={user ? <UserHomePage /> : <div>Content for non-logged in users</div>} />
        <Route
          path="/add-service-listing"
          element={user && user.role === "serviceProvider" ? <AddServiceListingForm /> : <Navigate to="/" />}
        />
        <Route
          path="/add-event-listings"
          element={user && user.role === "organizer" ? <div>Add Event Listing Page</div> : <Navigate to="/" />}
        />
        <Route path="/edit-listing/:id" element={<EditServiceListingForm />} />
        <Route
          path="/manage-listings/*"
          element={user ? <ManageListingsPage /> : <Navigate to="/" />}
        />
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
      <div>
        {showLoginModal && <SigninModal />}
        {showRegisterModal && <RegisterModal />}
        <Navbar />
        <div className='pt-[100px]'>
          <div className='h-full'>
            {renderContent()}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
