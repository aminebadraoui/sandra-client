import React from 'react';

const RoleSelector = ({ onRoleSelect }) => {
    return (
        <div className="">

            <div className="flex space-x-4">
                <RoleOption
                    icon="🧑‍💼"
                    title="I'm an organizer, hiring for an event"
                    role="organizer"
                    onSelect={onRoleSelect}
                />
                <RoleOption
                    icon="🛠️"
                    title="I'm a service provider, looking for work"
                    role="serviceProvider"
                    onSelect={onRoleSelect}
                />
            </div>
        </div>
    );
};

const RoleOption = ({ icon, title, role, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(role)}
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            <span className="text-3xl mb-2">{icon}</span>
            <span className="text-sm text-center">{title}</span>
        </button>
    );
};

export default RoleSelector;