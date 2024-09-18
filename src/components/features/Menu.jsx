import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";

import { noSessionMenu } from "../../models/Menu";
import { serviceProviderMenu } from "../../models/Menu";
import MenuItem from "./MenuItem";


const Menu = () => {
    const [isMenuOpen, setOpenMenu] = useState(false)

    const isSignedIn = false

    const toggleMenu = () => {
        setOpenMenu(!isMenuOpen)
    }
    return (
        <>
            <div className="relative bg-white p-2 border-[1px] rounded shadow-md">

                <div className="flex flex-row items-center gap-2 hover:cursor-pointer">
                    <div className="" onClick={toggleMenu} >
                        <AiOutlineMenu />
                    </div>
                    <div>
                        <Avatar />
                    </div>
                </div>


                {
                    isMenuOpen && <div className="absolute right-0 top-12 py-2 flex flex-col align-middle gap-2 border-[1px] rounded shadow-md w-[25vw]  ">
                        {
                            isSignedIn && serviceProviderMenu.map((elem, index) => {
                                return <MenuItem name={elem.name} key={index} onClick={elem.action} />
                            })
                        }

                        {
                            !isSignedIn && noSessionMenu.map((elem, index) => {
                                return <MenuItem name={elem.name} key={index} onClick={elem.action} />
                            })
                        }
                    </div>}

            </div>

        </>
    )




}

export default Menu;




const user = { id: 0, username: "jeff" }

function haveFun({ id, username }) {
    console.log(id)
    console.log(username)
}