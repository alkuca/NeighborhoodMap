import React, {Component} from 'react'
import './App.css'
import ListItem from "./ListItem";
import Search from"./Search";
const images = require.context('../public/images', true);
const hamburgerIcon = images("./hamburger.png");

class Sidebar extends Component{
    state = {
        hamburgerStatus:"closed"
    };


    hamburgerFunctionality(){
        if(window.innerWidth < 1039) {
            let sidebar = document.querySelector(".sidebar");
            let mapContainer = document.querySelector("#map");
            let hamburgerContent = document.querySelector(".search-and-items");
            let markerInfo = document.querySelector(".marker-info");
            if (this.state.hamburgerStatus === "closed") {
                sidebar.style.height = "110%";
                setTimeout(function () {
                    mapContainer.style.top = "110%";
                },700);
                markerInfo.style.top = "210%";
                setTimeout(function () {
                    hamburgerContent.style.visibility = "visible";
                }, 500);
                this.setState({
                    hamburgerStatus: "open"
                })
            } else if (this.state.hamburgerStatus === "open") {
                sidebar.style.height = "10%";
                mapContainer.style.top = "10%";
                markerInfo.style.top = "110%";
                hamburgerContent.style.visibility = "hidden";
                this.setState({
                    hamburgerStatus: "closed"
                })
            }
        }
    }

    render(){
        let filteredLocations = this.props.locations.filter(
            (location) => {
                return location.title.toLowerCase().indexOf(this.props.query.toLowerCase()) !== -1;
            },
        );

        return(
            <aside className="sidebar">
                <div role="button" className="hamburger" tabIndex="-1"
                     onClick={() => {
                        this.hamburgerFunctionality()
                     }}>
                    <img src={hamburgerIcon} alt={"hamburger icon"}/>
                </div>
                <div className="app-name-container">
                    <h1 className="app-name">Neighborhood <br/>Map</h1>
                </div>
                <div className="search-and-items">
                    <Search
                        locations={this.props.locations}
                        searchForLocation={this.props.searchForLocation}
                    />
                    <div className="items">
                        {filteredLocations.map((location) =>
                            <ListItem
                                key={location.id}
                                locations={location}
                                zoomToMarker={this.props.zoomToMarker}
                                titleClicked={this.props.titleClicked}
                                setImage={this.props.setImage}
                                getWiki={this.props.getWiki}
                                onlyOpenInfoSidebar={this.props.onlyOpenInfoSidebar}
                                hamburgerFunctionality={this.hamburgerFunctionality.bind(this)}
                            />
                        )}
                    </div>
                </div>
            </aside>
        )
    }
}

export default Sidebar;