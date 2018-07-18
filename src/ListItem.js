import React, {Component} from 'react'
import './App.css'


class ListItem extends Component{


    render(){
        return(
            <div className="each-item-container"
                 onClick={(event) => {
                     this.props.zoomToMarker(this.props.locations.location);
                     this.props.titleClicked(this.props.locations.title);
                     this.props.setImage(this.props.locations.image);
                     this.props.getWiki(this.props.locations.title);
                     this.props.onlyOpenInfoSidebar();
                 }}>
                <h3>{this.props.locations.title}</h3>
                <hr id="hr"/>
            </div>
        )
    }
}

export default ListItem;