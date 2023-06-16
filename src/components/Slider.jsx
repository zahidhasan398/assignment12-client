import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';



const Slider = () => {
    
    return (
        <div>
            <AwesomeSlider>
                <div style={{backgroundImage:`url("https://media.istockphoto.com/id/1309683011/photo/futuristic-rustic-cricket-wickets.webp?b=1&s=170667a&w=0&k=20&c=lDBFr6G7ZPO-mhO9OOS8gKGIs65IET61ryu24WfzQHE=")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",paddingTop:"200px"}} >
                    <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-bold text-white max-w-3xl text-center'>Learn sports by iternational instructors</h1>
                    <p className='text-md max-w-5xl text-white my-3 text-center'>
                    Sport pertains to any form of physical activity or game, often competitive and organized, that aims to use, maintain, or improve physical ability and skills while providing enjoyment to participants and, in some cases, entertainment to spectators.[2] Sports can, through casual or organized participation, improve participants' physical health. Hundreds of sports exist, from those between single contestants, through to those with hundreds of simultaneous participants, either in teams or competing as individuals
                    </p>
                    </div>
                </div>
                <div style={{backgroundImage:`url("https://media.istockphoto.com/id/469732852/photo/dramatic-soccer-stadium.webp?b=1&s=170667a&w=0&k=20&c=1fdq6MUVaEyZ6VcX2iXDErMgYI7CI_H7rxByAupCcwo=")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",paddingTop:"200px"}}>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-bold text-white max-w-3xl text-center'>Learn sports by iternational instructors</h1>
                    <p className='text-md max-w-5xl text-white my-3 text-center'>
                    Sport pertains to any form of physical activity or game, often competitive and organized, that aims to use, maintain, or improve physical ability and skills while providing enjoyment to participants and, in some cases, entertainment to spectators.[2] Sports can, through casual or organized participation, improve participants' physical health. Hundreds of sports exist, from those between single contestants, through to those with hundreds of simultaneous participants, either in teams or competing as individuals
                    </p>
                    </div>
                </div>
                <div style={{backgroundImage:`url("https://media.istockphoto.com/id/613555120/photo/basketball-arena-3d.webp?b=1&s=170667a&w=0&k=20&c=JMxmk3dSHlN9Iz1IGYBwgprer1-YY6ZV_GAqvm9aC9o=")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",paddingTop:"200px"}}>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-bold text-white max-w-3xl text-center'>Learn sports by iternational instructors</h1>
                    <p className='text-md max-w-5xl text-white my-3 text-center'>
                    Sport pertains to any form of physical activity or game, often competitive and organized, that aims to use, maintain, or improve physical ability and skills while providing enjoyment to participants and, in some cases, entertainment to spectators.[2] Sports can, through casual or organized participation, improve participants' physical health. Hundreds of sports exist, from those between single contestants, through to those with hundreds of simultaneous participants, either in teams or competing as individuals
                    </p>
                    </div>
                </div>
                
            </AwesomeSlider>
        </div>
    );
};

export default Slider;