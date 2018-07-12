import React, {Component} from 'react'
import './App.css'
import ListItem from "./ListItem";
import Search from"./Search";
class Sidebar extends Component{

    state = {
        searchQuery: ""
    };


    getQuery(query){
        this.setState({searchQuery: query})
    }


    render(){

        let filteredLocations = this.props.locations.filter(
            (location) => {
                return location.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
            },
        );



        return(
            <div className="sidebar">
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
                        />
                    )}
                </div>
            </div>
        )
    }
}


export default Sidebar;