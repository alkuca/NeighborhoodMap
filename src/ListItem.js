import React, {Component} from 'react'
import './App.css'

function ListItem (props){
    return(
        <div className="each-item-container" tabIndex="0"
             onClick={(event) => {
                 props.zoomToMarker(props.locations.location);
                 props.titleClicked(props.locations.title);
                 props.setImage(props.locations.image);
                 props.getWiki(props.locations.title);
                 props.onlyOpenInfoSidebar();
                 props.hamburgerFunctionality();
             }}>
            <h3>{props.locations.title}</h3>
            <hr id="hr"/>
        </div>
    )
}

export default ListItem;