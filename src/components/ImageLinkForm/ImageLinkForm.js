import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm=({onInputChange, onButtonClick})=>{
    return(
    <div>
        <p style={{textAlign:'center'}} className="f3">
            {'This Magic Brain detect faces in your picture. give it a try!'}
        </p>
        <div className="center">
            <div className="form center pa4 br3 shadow-5">
                <input className="f4 pa2 w-70 center" type='Text' onChange={onInputChange}></input>
                <button onClick={onButtonClick} className="w-30 grow b--light-purple f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
            </div>
        </div>
    </div>
    )
}
export default ImageLinkForm;