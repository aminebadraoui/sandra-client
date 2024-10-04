import React, { useState, useEffect } from 'react';
import { FaUmbrellaBeach, FaHandsHelping } from 'react-icons/fa';

const RoleSelector = ({ onRoleSelect, initialRole }) => {
    const [selectedRole, setSelectedRole] = useState(initialRole || null);

    useEffect(() => {
        if (initialRole) {
            setSelectedRole(initialRole);
            onRoleSelect(initialRole);
        }
    }, [initialRole, onRoleSelect]);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        onRoleSelect(role);
    };

    return (
        <div className="flex space-x-md w-full">
            <button
                className={`flex-1 p-md rounded-lg flex flex-col items-center justify-between relative ${selectedRole === 'organizer' ? 'bg-primary-50 border-2 border-primary-500' : 'bg-white border border-gray-200'
                    }`}
                onClick={() => handleRoleSelect('organizer')}
            >
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border ${selectedRole === 'organizer' ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
                    }`}></div>
                <FaUmbrellaBeach className="text-4xl text-primary-500 mb-sm" />
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-xs">I'm a Retreat Organizer</h3>
                    <p className="text-sm text-gray-600">I plan and host transformative retreats</p>
                </div>
            </button>
            <button
                className={`flex-1 p-md rounded-lg flex flex-col items-center justify-between relative ${selectedRole === 'serviceProvider' ? 'bg-primary-50 border-2 border-primary-500' : 'bg-white border border-gray-200'
                    }`}
                onClick={() => handleRoleSelect('serviceProvider')}
            >
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border ${selectedRole === 'serviceProvider' ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
                    }`}></div>
                <FaHandsHelping className="text-4xl text-primary-500 mb-sm" />
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-xs">I'm a Retreat Service Provider</h3>
                    <p className="text-sm text-gray-600">I offer services to enhance retreats</p>
                </div>
            </button>
        </div>
    );
};

export default RoleSelector;