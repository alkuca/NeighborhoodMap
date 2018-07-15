import React from 'react';
import './App.css';
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import MarkerInfo from "./MarkerInfo";
const google = window.google;
let newMap;
let marker;
class App extends React.Component {
        state = {
            locations: [
                {title: 'Pula Arena', location: {lat: 44.872952, lng: 13.849226}, id: 1},
                {title: 'Island', location: {lat: 44.89861, lng: 13.785536}, id: 2},
                {title: 'Forum Square', location: {lat: 44.870001, lng: 13.842342}, id: 3},
                {title: 'Hawaiian Beach', location: {lat: 44.835201, lng: 13.830269}, id: 4},
                {title: 'Golden Door', location: {lat: 44.868291, lng: 13.846975}, id: 5},
                {title: 'Brioni', location: {lat: 44.922823, lng: 13.736672}, id: 6}
            ],
            markerClicked: ""
        };


    initMap() {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 44.872952, lng: 13.849226}
        });
        newMap = map;
        let locations = this.state.locations;
        let markers = [];
        let largeInfoWindow = new google.maps.InfoWindow();
        let bounds = new google.maps.LatLngBounds();
        for(let i= 0; i < locations.length; i++){
            let position = locations[i].location;
            let title = locations[i].title;
            marker = new google.maps.Marker({
                map:map,
                position: position,
                title: title,
                id: i,
                animation: google.maps.Animation.DROP,
            });
            markers.push(marker);
            bounds.extend(marker.position);
            marker.addListener("click", function () {
                makeInfoWindow(this,largeInfoWindow);
                clickedMarker(this);
            });
            let clickedMarker = (marker) => {
                this.setState({
                    markerClicked: marker.title
                });
            };
        }
        map.fitBounds(bounds);
        function  makeInfoWindow(marker, infoWindow) {
            if(infoWindow.marker !== marker){
                infoWindow.marker = marker;
                infoWindow.setContent('<div>' + marker.title + '</div>');
                infoWindow.open(map, marker);
                infoWindow.addListener('closeclick', function () {
                    infoWindow.marker = null;
                    infoWindow.close();
                })
            }
        }

    }



    async componentDidMount(){
        this.initMap();
    }



    zoomToMarker(event){
        newMap.setCenter(event);
        newMap.setZoom(14);
        setTimeout(function () {
            newMap.setZoom(16);
        },800)
    }








    render() {
        return (
            <div className="App">
                <Navbar />
                <Sidebar locations={this.state.locations} zoomToMarker={this.zoomToMarker.bind(this)}/>
                <MapComponent locations={this.state.locations}/>
                <MarkerInfo markerClicked={this.state.markerClicked}/>
            </div>
        );
    }
}

export default App;
