import React, {Component} from 'react'
import './App.css'
import ListItem from "./ListItem";
import Search from"./Search";
const images = require.context('../public/images', true);
const hamburgerIcon = images("./hamburger.png");

class Sidebar extends Component{
    state = {
        searchQuery: "",
        hamburgerStatus:"closed"
    };

    getQuery(query){
        this.setState({searchQuery: query})
    }

    hamburgerFunctionality(){
        if(window.innerWidth < 1039) {
            let sidebar = document.querySelector(".sidebar");
            let hamburgerContent = document.querySelector(".search-and-items");
            if (this.state.hamburgerStatus === "closed") {
                sidebar.style.height = "110%";
                setTimeout(function () {
                    hamburgerContent.style.visibility = "visible";
                }, 500);
                this.setState({
                    hamburgerStatus: "open"
                })
            } else if (this.state.hamburgerStatus === "open") {
                sidebar.style.height = "10%";
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
                return location.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
            },
        );

        return(
            <div className="sidebar">
                <div className="hamburger" tabIndex="-1"
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
                        getQuery={this.getQuery.bind(this)}
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
            </div>
        )
    }
}

export default Sidebar;