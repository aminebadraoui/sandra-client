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
            <div className="py-4 flex items-center ">
                <h1 className="text-8xl  font-bold">Welcome, {user.firstName}!</h1>
            </div>

            {user.role === "serviceProvider" ? (
                <ServiceProviderHomePage />
            ) : (
                <OrganizerHomePage />
            )}
        </div>
    );
}

export default UserHomePage;