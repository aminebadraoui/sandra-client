import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import UsersList from '../admin/UsersList';
import ServiceCategories from '../admin/ServiceCategories';

const AdminDashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <Routes>
                    <Route path="users" element={<UsersList />} />
                    <Route path="service-categories" element={<ServiceCategories />} />
                    <Route index element={<h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;