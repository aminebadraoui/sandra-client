import React from 'react'
import Hero from '../../../../components/03.blocks/landing/Hero'

const HeroSection = ({ mainAction, secondaryAction }) => {
    return (
        <Hero
            imageUrl="https://res.cloudinary.com/dbwefnkfe/image/upload/v1728009026/campfire-1024x700_fbpig0.jpg"
            title="Craft Transformative Retreat Experiences"
            subtitle="Where Vision Meets Serenity: Your Ultimate Retreat Planning Partner"
            buttonTitle="Start Your Journey"
            secondaryButtonTitle="Explore Retreat Services"
            mainAction={mainAction}
            secondaryAction={secondaryAction}
        />
    )
}

export default HeroSection