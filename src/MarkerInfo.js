import React, {Component} from 'react'
import './App.css'
import APIinfo from "./APIinfo";
const images = require.context('../public/images', true);
const arrow = images("./arrow.png");

class MarkerInfo extends Component{
    state={
        arrow:false
    };

    rotate(){
        let arrowIcon = document.querySelector(".arrow-icon");
        if(this.state.arrow === false){
            arrowIcon.style.transform = "rotate(180deg)";
        this.setState({
            arrow:true
        })
        }
        else if(this.state.arrow === true){
            arrowIcon.style.transform = "none";
        this.setState({
            arrow:false
        });
        }
    }

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
                            this.rotate();
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

