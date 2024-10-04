import React from 'react'
import { Link } from 'react-router-dom'

const RightImageSection = ({ imageUrl, title, description, buttonTitle, mainAction }) => {
    return (
        <section className="py-2xl px-md sm:px-lg lg:px-xl bg-gray-50 w-full">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-xl">
                    <div className="md:w-1/2">
                        <img src={imageUrl} alt="Right Image" className="rounded-lg shadow-md w-full" />
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start">
                        <h2 className="text-3xl font-bold mb-lg text-center md:text-left"> {title} </h2>
                        <div>
                            {description}
                        </div>
                        <Link onClick={mainAction} className="bg-primary-500 text-white px-lg py-sm rounded-md font-semibold hover:bg-primary-600 transition duration-300 self-center md:self-start">
                            {buttonTitle}
                        </Link>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default RightImageSection