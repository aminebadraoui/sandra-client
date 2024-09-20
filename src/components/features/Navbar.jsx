import React from "react";
import { Link } from 'react-router-dom';
import Avatar from "./Avatar";
import Menu from "./Menu";
import Logo from "./Logo";
import { Switch } from "@headlessui/react";
import useUserStore from "../../state/userStore";

const Navbar = () => {
    const { user, toggleRole } = useUserStore();

    return (
        <div className="bg-white fixed z-50 w-full border-b border-[1px] shadow-md h-auto py-2">
            <div className="flex flex-row justify-between items-center h-full px-16">
                <Link to="/" >
                    <Logo />
                </Link>


                <div className="flex flex-row gap-4 items-center">
                    {user && (
                        <>
                            {user.isAdmin && (
                                <Link to="/admin" className="text-blue-600 hover:text-blue-800">
                                    Admin Dashboard
                                </Link>
                            )}
                            <div className="flex items-center">
                                <span className={`mr-2 ${user.role === "serviceProvider" ? "font-bold" : "text-gray-500"}`}>
                                    Service Provider
                                </span>
                                <Switch
                                    checked={user.role === "organizer"}
                                    onChange={toggleRole}
                                    className={`${user.role === "organizer" ? "bg-blue-600" : "bg-green-500"
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    <span
                                        className={`${user.role === "organizer" ? "translate-x-6" : "translate-x-1"
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>
                                <span className={`ml-2 ${user.role === "organizer" ? "font-bold" : "text-gray-500"}`}>
                                    Organizer
                                </span>
                            </div>
                        </>
                    )}
                    <Menu />
                </div>
            </div>
        </div>
    );
}

export default Navbar;