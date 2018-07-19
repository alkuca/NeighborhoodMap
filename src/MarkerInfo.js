import React, {Component} from 'react'
import './App.css'
import APIinfo from "./APIinfo";
const images = require.context('../public/images', true);
const arrow = images("./arrow.png");

class MarkerInfo extends Component{


    render(){
        return(
            <div>
                <div className="marker-info hide">
                    <APIinfo
                        markerClicked={this.props.markerClicked}
                        imageSrc={this.props.imageSrc}
                        wiki={this.props.wiki}
                    />
                    <div className="open-close-button"
                        onClick={() => {
                            this.props.openCloseInfoSidebar();
                    }}>
                        <div className="arrow">
                            <img className="arrow-icon" src={arrow} alt="arrow"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MarkerInfo;

