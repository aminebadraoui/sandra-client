import React from 'react'
import { FaLeaf, FaYinYang, FaHandsHelping } from 'react-icons/fa';
import FeatureCard from '../../../../components/03.blocks/landing/FeatureCard'

const FeaturesSection = () => {
    return (
        <section className="py-2xl px-md sm:px-lg w-full">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-xl">Why Sandra is Your Retreat's Secret Sanctuary</h2>
                <div className="flex flex-col md:flex-row justify-between items-start gap-lg">
                    <FeatureCard
                        title="Curated Excellence"
                        description="Connect with a diverse array of handpicked, professional service providers to bring your retreat vision to life."
                        icon={<FaLeaf className="text-5xl text-primary-500" />}
                    />
                    <FeatureCard
                        title="Holistic Support"
                        description="Rest assured with our vetted wellness experts and retreat specialists, ensuring a transformative experience."
                        icon={<FaYinYang className="text-5xl text-primary-500" />}
                    />
                    <FeatureCard
                        title="Seamless Harmony"
                        description="Experience the ease of planning with our intuitive platform, designed to bring peace to your retreat creation process."
                        icon={<FaHandsHelping className="text-5xl text-primary-500" />}
                    />
                </div>

            </div>

        </section>
    )
}



export default FeaturesSection