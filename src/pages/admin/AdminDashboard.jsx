import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import UsersList from './UsersList';
import ServiceCategories from './ServiceCategories';
import ReviewListings from './ReviewListings';

const AdminDashboard = () => {
    return (
        <div className="flex h-screen">
            < Sidebar />
            <div className="flex-1 w-full ml-64">
                <div className='w-full'>
                    <Routes>
                        <Route path="users" element={<UsersList />} />
                        <Route path="service-categories" element={<ServiceCategories />} />
                        <Route path="service-listings" element={<ReviewListings />} />
                        <Route path="/" element={<h1 className="text-2xl font-bold p-4">Welcome to Admin Dashboard</h1>} />
                    </Routes>

                </div>

            </div>
        </div >
    );
};

export default AdminDashboard;