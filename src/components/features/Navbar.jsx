import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Avatar from "./Avatar";
import Menu from "./Menu";
import Logo from "./Logo";
import useUserStore from "../../state/userStore";

const Navbar = () => {
    const { user, toggleRole } = useUserStore();
    const navigate = useNavigate();

    const getSwitchRoleText = () => {
        return user.role === "serviceProvider" ? "Switch to Organizer" : "Switch to Service Provider";
    };

    const handleToggleRole = () => {
        toggleRole();
        navigate('/'); // Redirect to homepage after toggling role
    };

    return (
        <div className="bg-white fixed z-50 w-full border-b border-[1px] shadow-md h-auto py-2">
            <div className="flex flex-row justify-between items-center h-full px-4 max-w-7xl mx-auto">
                <Link to="/" className="flex items-center">
                    <Logo />
                </Link>

                <div className="flex flex-row gap-4 items-center">
                    {user && (
                        <>
                            {user.isAdmin && (
                                <Link to="/admin" className="text-rose-600 hover:text-rose-800">
                                    Admin Dashboard
                                </Link>
                            )}
                            <button
                                onClick={handleToggleRole}
                                className="text-rose-500 hover:text-blue-800"
                            >
                                {getSwitchRoleText()}
                            </button>
                        </>
                    )}
                    <Menu />
                </div>
            </div>
        </div>
    );
}

export default Navbar;