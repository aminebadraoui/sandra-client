import React from 'react'
import { Link } from 'react-router-dom';

const CTASection = ({ mainAction }) => {
    return (
        <section className="py-2xl px-md sm:px-lg lg:px-xl text-center bg-primary-50 w-full">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-md">Ready to Cultivate Transformative Retreats?</h2>
                <p className="text-xl mb-lg">Join Sandra today and be part of the wellness revolution.</p>
                <Link onClick={mainAction} className="bg-primary-500 text-white px-xl py-sm rounded-md font-semibold hover:bg-primary-600 transition duration-300">
                    Begin Your Mindful Journey
                </Link>
            </div>
        </section>
    )
}

export default CTASection