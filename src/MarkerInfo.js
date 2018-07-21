import React from 'react'
import './App.css'
import APIinfo from "./APIinfo";
const images = require.context('../public/images', true);
const arrow = images("./arrow.png");

function MarkerInfo (props){
    return(
        <div>
            <div className="marker-info hide">
                <APIinfo
                    markerClicked={props.markerClicked}
                    imageSrc={props.imageSrc}
                    wiki={props.wiki}
                />
                <div className="open-close-button"
                     onClick={() => {
                         props.openCloseInfoSidebar();
                    }}>
                    <div className="arrow">
                        <img className="arrow-icon" src={arrow} alt="arrow"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkerInfo;

