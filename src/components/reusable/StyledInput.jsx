import React, { useState } from "react";

const StyledInput = ({ placeholder, type, onChange, ...props }) => {
    const [hasText, setHasText] = useState(false)

    console.log(props)
    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        setHasText(inputValue.length > 0)

        if (onChange) {
            onChange(e);
        }



    }
    return (
        <div className="relative w-full bg-red-500 rounded">
            <input className="border p-4 focus:outline-none w-full rounded peer "

                placeholder=" "
                type={type}
                onChange={handleInputChange}
                {...props}

            />

            {!hasText && <label className="text-gray-400 absolute top-4 left-4 pointer-events-none peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:-translate-x-2 duration-300 transition-all"> {placeholder}</label>}
        </div>
    );
}

export default StyledInput;