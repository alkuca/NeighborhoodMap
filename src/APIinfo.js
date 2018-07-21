import React, {Component} from 'react';
import './App.css'

function APIinfo(props){
    return(
        <div className="info-content">
            <p className="marker-clicked">{props.markerClicked}</p>
            <img className="wiki-image" src={props.imageSrc} alt={props.markerClicked} />
            <div className="wiki-text">{props.wiki}</div>
        </div>
    )
}

export default APIinfo;