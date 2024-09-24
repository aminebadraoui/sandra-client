import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ title, onClose, children }) => {
    return (
        <div className="fixed inset-0 z-[9999]  bg-white overflow-y-auto">
            <div className="p-4 mx-4 border-b flex items-center justify-center relative">
                <h2 className="text-2xl font-bold pl-8">{title}</h2>
                <button
                    onClick={onClose}
                    className="absolute left-4 text-gray-500 hover:text-gray-700"
                >
                    <IoMdClose size={24} />
                </button>
            </div>
            <div className="bg-white rounded-lg w-full max-w-md mx-auto my-8">

                <div className="p-4 h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;