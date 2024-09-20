import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/service-categories" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            Service Categories
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;