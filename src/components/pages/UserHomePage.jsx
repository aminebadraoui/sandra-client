import React, { useState } from 'react';
import useUserStore from '../../state/userStore';
import ServiceProviderHomePage from './service provider/ServiceProviderHomePage';
import OrganizerHomePage from './event organizer/OrganizerHomePage';
import UserProfileSetup from '../onboarding/UserProfileSetup';

const UserHomePage = () => {
    const { user } = useUserStore();
    const [isFirstTimeUser, setIsFirstTimeUser] = useState(true); // This should be determined by your backend

    if (!user) {
        return <div>Loading...</div>;
    }

    if (isFirstTimeUser) {
        return <UserProfileSetup />;
    }

    return (
        <div className="px-6">
            <div className="py-4 flex items-center ">
                <h1 className="text-8xl font-bold">Welcome, {user.firstName}!</h1>
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