import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ title, onClose, children }) => {
    return (
        <div className="fixed absoulte inset-0 z-[9999]  bg-white">
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 relative left-4 top-4"
            >
                <IoMdClose size={24} />
            </button>
            <div className="flex justify-center items-center w-full h-full">
                <div className="bg-white rounded-lg w-full max-w-md mx-auto">
                    <div className="p-4 border-b flex items-center justify-center">
                        <h2 className="text-2xl text-center font-bold">{title}</h2>

                    </div>
                    <div className="p-4 max-h-[80vh] overflow-y-auto">
                        {children}
                    </div>
                </div>

            </div>



        </div>
    );
};

export default Modal;