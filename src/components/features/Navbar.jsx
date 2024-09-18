import React from "react";
import Avatar from "./Avatar";
import Menu from "./Menu";
import Logo from "./Logo";

const Navbar = () => {
    return <div className="bg-white fixed w-full border-b border-[1px] shadow-md h-auto py-2">
        <div className="flex flex-row justify-between items-center h-full px-16">
            <Logo />

            <div className="flex flex-row gap-4 items-center">
                <p>
                    Switch To Organizer
                </p>
                <Menu />



            </div>

        </div>

    </div>;
}

export default Navbar;