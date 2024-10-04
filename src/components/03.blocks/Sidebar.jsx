import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-rose-800 fixed left-0 text-white w-64 min-h-screen flex flex-col">
            <h2 className="text-2xl font-bold p-6">Admin Dashboard</h2>
            <nav className="flex-grow">
                <ul className="space-y-2 mt-4">
                    <li>
                        <Link to="/admin/users" className="block py-2 px-4 hover:bg-rose-700">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/service-categories" className="block py-2 px-4 hover:bg-rose-700">
                            Service Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/service-listings" className="block py-2 px-4 hover:bg-rose-700">
                            Review Listings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;