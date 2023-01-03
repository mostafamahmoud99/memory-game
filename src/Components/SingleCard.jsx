import './SingleCard.css';
import cover from "../imgCover/cover.png";

import React from 'react'

export default function SingleCard({card , handleChoice , flipped , disAbled}) {

    const handleClick = () =>{
        if(!disAbled){
            handleChoice(card)
        }
    }
    return (
        <>
            <div className="col-md-3 my-3">
                <div className="card">
                <div className= {flipped ? 'flipped' : ''} >
                    <img src={card.src} className='w-100 front rounded' alt="front-img" />
                    <img src={cover} onClick={handleClick} className="w-100 back rounded" alt="back-img" />
                </div>
                </div>
            </div>
        </>
    )
}
