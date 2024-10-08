import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Avatar from "../02.core/Avatar";
import Menu from "./Menu";
import Logo from "../02.core/Logo";
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
        <div className="bg-white fixed z-50 w-full h-[80px] flex flex-col justify-center">
            <div className="flex flex-row justify-between h-full mx-3xl">
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
                                className="text-primary-500 hover:text-blue-800"
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