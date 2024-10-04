import React from "react";

const MenuItem = ({ name, onClick }) => {
    return (
        <div className="hover:cursor-pointer hover:bg-gray-200" onClick={onClick}>
            <div className="p-2">
                {name}
            </div>

        </div>
    );
}

export default MenuItem;