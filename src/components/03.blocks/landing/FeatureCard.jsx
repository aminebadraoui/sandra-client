import React from 'react'

const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-white p-lg rounded-lg shadow-md text-center  flex flex-col items-center h-full">
        <div className="mb-md flex items-center justify-center h-20">{icon}</div>
        <h3 className="text-xl font-semibold mb-sm">{title}</h3>
        <p>{description}</p>
    </div>
);

export default FeatureCard