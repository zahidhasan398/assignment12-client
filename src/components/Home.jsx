import React from 'react';
import Slider from './Slider';
import OurClub from './Footer/OurClub';
import PopularClasses from './topSix/PopularClasses';
import PopularInstructor from './topSix/PopularInstructor';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
            <OurClub></OurClub>
        </div>
    );
};

export default Home;