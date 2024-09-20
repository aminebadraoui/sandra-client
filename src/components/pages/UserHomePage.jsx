import React from "react";
import useUserStore from '../../state/userStore';
import ServiceProviderHomePage from './ServiceProviderHomePage';
import OrganizerHomePage from './OrganizerHomePage';

const UserHomePage = () => {
    const { user } = useUserStore();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-8xl font-bold mb-4">Welcome, {user.firstName}!</h1>
            {user.role === "serviceProvider" ? (
                <ServiceProviderHomePage />
            ) : (
                <OrganizerHomePage />
            )}
        </div>
    );
}

export default UserHomePage;