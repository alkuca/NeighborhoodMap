import React, {Component} from 'react';
import './App.css'

class APIinfo extends Component{
    render(){
        return(
            <div className="info-content">
                <p className="marker-clicked">{this.props.markerClicked}</p>
                <img className="wiki-image" src={this.props.imageSrc} alt={this.props.markerClicked} />
                <div className="wiki-text">{this.props.wiki}</div>
            </div>
        )
    }
}

export default APIinfo;