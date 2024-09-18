import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ title, onClose, children }) => {
    return (
        <div className="fixed z-50 inset-0 bg-gray-800/20 w-full overflow-x-hidden overflow-y-auto flex items-center justify-center ">

            <div className="h-auto bg-white w-full  md:w-4/6 flex flex-col items-center ">
                <div className="p-2 border-b-[1px] w-full flex items-center justify-center relative">
                    <p className="font-semibold"> {title} </p>
                    <button className=" absolute left-4 py-4 "
                        onClick={onClose}>
                        <IoMdClose></IoMdClose>
                    </button>
                </div>

                <div className="w-full"> {children} </div>
            </div>


        </div>);
}

export default Modal;