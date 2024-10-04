import React from 'react'

const Hero = ({
    imageUrl,
    title,
    subtitle,
    buttonTitle,
    secondaryButtonTitle,
    mainAction,
    secondaryAction }) => {
    return (
        <section className=" w-screen h-screen">
            <img
                src={imageUrl}
                alt="Hero Image"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 mx-auto max-w-4xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-md">
                        {title}
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white mb-lg">
                        {subtitle}
                    </p>
                    <div className="flex justify-center space-x-md">
                        <button onClick={mainAction} className="bg-primary-500 text-white px-lg py-sm rounded-md font-semibold hover:bg-primary-600 transition duration-300">
                            {buttonTitle}
                        </button>
                        <button onClick={secondaryAction} className="bg-white text-primary-500 px-lg py-sm rounded-md font-semibold hover:bg-gray-100 transition duration-300">
                            {secondaryButtonTitle}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero