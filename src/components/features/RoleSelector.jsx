import React, { useState } from 'react';
import { FaUmbrellaBeach, FaHandsHelping } from 'react-icons/fa';

const RoleSelector = ({ onRoleSelect }) => {
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        onRoleSelect(role);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
            <RoleOption
                icon={<FaUmbrellaBeach className="text-4xl text-primary-500" />}
                title="Retreat Organizer"
                description="I plan and host transformative retreats"
                role="organizer"
                onSelect={handleRoleSelect}
                isSelected={selectedRole === 'organizer'}
            />
            <RoleOption
                icon={<FaHandsHelping className="text-4xl text-primary-500" />}
                title="Retreat Service Provider"
                description="I offer services to enhance retreats"
                role="serviceProvider"
                onSelect={handleRoleSelect}
                isSelected={selectedRole === 'serviceProvider'}
            />
        </div>
    );
};

const RoleOption = ({ icon, title, description, role, onSelect, isSelected }) => {
    return (
        <button
            onClick={() => onSelect(role)}
            className={`relative flex flex-col items-center p-6 border-2 rounded-lg transition-all duration-300 ease-in-out w-full shadow-sm hover:shadow-md
                ${isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-500 bg-white'}`}
        >
            <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border ${isSelected
                    ? 'bg-primary-500 border-primary-500'
                    : 'bg-white border-gray-300'
                }`}></div>
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 text-center">{description}</p>
        </button>
    );
};

export default RoleSelector;