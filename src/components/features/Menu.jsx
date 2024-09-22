import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";

import { noSessionMenu, serviceProviderMenu, organizerMenu } from "../../models/Menu";
import MenuItem from "./MenuItem";
import useUserStore from "../../state/userStore";

const Menu = () => {
    const [isMenuOpen, setOpenMenu] = useState(false);
    const { user } = useUserStore();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setOpenMenu(!isMenuOpen);
    }

    const handleMenuItemClick = (item) => {
        if (item.path) {
            navigate(item.path);
        } else if (item.action) {
            item.action();
            if (item.name === "Sign out") {
                navigate('/');
            }
        }
        setOpenMenu(false);
    }

    return (
        <>
            <div className="relative bg-white p-2 border-[1px] rounded shadow-md w-24">
                <div className="flex flex-row justify-between items-center gap-2 hover:cursor-pointer">
                    <div className="" onClick={toggleMenu} >
                        <AiOutlineMenu />
                    </div>
                    <div>
                        <Avatar size="sm" />
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="absolute z-50 bg-white right-0 top-12 py-2 flex flex-col align-middle gap-2 border-[1px] rounded shadow-md w-[25vw]">
                        {user ? (
                            (user.role === "organizer" ? organizerMenu : serviceProviderMenu).map((item, index) => (
                                <MenuItem
                                    name={item.name}
                                    key={index}
                                    onClick={() => handleMenuItemClick(item)}
                                />
                            ))
                        ) : (
                            noSessionMenu.map((item, index) => (
                                <MenuItem
                                    name={item.name}
                                    key={index}
                                    onClick={() => handleMenuItemClick(item)}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Menu;