import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'
const Logo=()=>{
    return(
        <div style={{width:'75px'}} className="ma4  mt0 ">
            <Tilt className="tilt br2 shadow-2 " options={{max:55}}>
                <div style={{ height: '65px', width:'60px', tiltMaxAngleX: '50°' }}>
                <h1 className="pa2"><img style={{paddingTop:'2px', paddingLeft:'2px'}} alt="brain" src={brain}></img></h1>
                </div>
            </Tilt>
        </div>
    )
}
export default Logo;