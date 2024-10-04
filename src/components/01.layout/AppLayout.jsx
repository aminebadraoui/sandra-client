import React from 'react'

const AppLayout = ({ children }) => {
    return (
        <div className='mx-3xl flex flex-col items-center'>
            {children}
        </div>
    )
}

export default AppLayout