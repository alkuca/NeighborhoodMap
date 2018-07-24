import React from 'react';
import './App.css';
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar"
import MarkerInfo from "./MarkerInfo";
const images = require.context('../public/images', true);
const arena = images("./arena.jpg");
const jerolim = images("./jerolim.jpg");
const beach = images("./beach.jpg");
const vrata = images("./vrata.jpg");
const brijuni = images("./brijuni.jpg");
const forum = images("./forum.jpg");
const google = window.google;
let marker;
let markers = [];
let map;


class App extends React.Component {
        state = {
            locations: [
                {title: 'Pula Arena', image:arena, location: {lat: 44.872952, lng: 13.849226}, id: 1},
                {title: 'Jerolim island', image:jerolim, location: {lat: 44.89861, lng: 13.785536}, id: 2},
                {title: 'Pula Communal Palace', image:forum, location: {lat: 44.870001, lng: 13.842342}, id: 3},
                {title: 'Hawaiian Beach Verudela', image:beach, location: {lat: 44.835201, lng: 13.830269}, id: 4},
                {title: 'Arch of the Sergii', image:vrata, location: {lat: 44.868291, lng: 13.846975}, id: 5},
                {title: 'Brijuni', image:brijuni, location: {lat: 44.922823, lng: 13.736672}, id: 6}
            ],
            markerClicked: "",
            imageSrc: "",
            wiki:"",
            query:"",
        };

    gm_authFailure(){
        window.alert("Google Maps error!")
    }

    initMap() {
        try{
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 44.872952, lng: 13.849226}
            });
        }catch (error) {
            alert("something is wrong with google maps request, refresh the page");
        }

        let locations = this.state.locations;
        let largeInfoWindow = new google.maps.InfoWindow();
        let bounds = new google.maps.LatLngBounds();
        for(let i= 0; i < locations.length; i++){
            let position = locations[i].location;
            let title = locations[i].title;
            let images = locations[i].image;
            marker = new google.maps.Marker({
                map: map,
                position: position,
                title: title,
                image: images,
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
                    markerClicked: marker.title,
                    imageSrc: marker.image
                });
                this.getWiki(this.state.markerClicked);
                this.onlyOpenInfoSidebar();
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

    componentDidMount(){
        let scope=this;
        let intervalID = setInterval(function(){
            google?function(){scope.initMap();clearInterval(intervalID)}():null;
        },100);

        window.gm_authFailure = this.gm_authFailure;
    }


    zoomToMarker(event){
        map.setCenter(event.location);
        map.setZoom(14);
        setTimeout(function () {
            map.setZoom(16);
        },800);
        setTimeout(function () {
            markers.forEach(element => {
                if (element.title === event.title && element.animation === null) {
                    element.setAnimation(4);
                }
            });
        },1200)
    }


    titleClicked(event){
        this.setState({
            markerClicked: event
        });
    }

    setImage(image){
        this.setState({
            imageSrc: image
        })
    }

    wikiTest(data){
        if(typeof data === "object" && data[2].length === 0){
            this.setState({
                wiki: "No data from Wikipedia"
            })
        }
    }

    getWiki(title){
        fetch("https://en.wikipedia.org/w/api.php?action=opensearch&search="+title+"&format=json&origin=*")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("error with fetch");
                }
            })
            .then(parsedJSON => parsedJSON)
            .then(data => {
                this.setState({
                    //extracts only wikipedia text from json
                    wiki: data[2],
                });
                this.wikiTest(data);
            })
            .catch((error) => {
                alert(error)
            });
    }

    // opens or close second sidebar
    openCloseInfoSidebar(){
        let infoContent = document.querySelector(".info-content");
        let infoSidebar = document.querySelector(".marker-info");
        if(!infoSidebar.classList.contains("hide")){
            infoSidebar.classList.add("hide");
            infoContent.style.visibility="hidden";
        }else if(infoSidebar.classList.contains("hide")){
            infoSidebar.classList.remove("hide");
            infoContent.style.visibility="visible";
        }
    }

    // only open second sidebar
    onlyOpenInfoSidebar(){
        let infoContent = document.querySelector(".info-content");
        let infoSidebar = document.querySelector(".marker-info");
        if(infoSidebar.classList.contains("hide")){
            infoSidebar.classList.remove("hide");
            infoContent.style.visibility="visible";
        }
    }

    searchForLocation(event){
        this.setState({
            query: event.target.value,
        });
        // displays and hides markers based on search query
        markers.forEach(element =>{
            if(element.title.toLowerCase().indexOf(this.state.query) !== -1){
                element.setVisible(true)
            }else{
                element.setVisible(false)
            }
        });
    }



    render() {
        return (
            <div className="App">
                <Sidebar
                    locations={this.state.locations}
                    zoomToMarker={this.zoomToMarker.bind(this)}
                    titleClicked={this.titleClicked.bind(this)}
                    setImage={this.setImage.bind(this)}
                    getWiki={this.getWiki.bind(this)}
                    onlyOpenInfoSidebar={this.onlyOpenInfoSidebar.bind(this)}
                    searchForLocation={this.searchForLocation.bind(this)}
                    query={this.state.query}
                />
                <MapComponent
                    locations={this.state.locations}/>
                <MarkerInfo
                    openCloseInfoSidebar={this.openCloseInfoSidebar.bind(this)}
                    markerClicked={this.state.markerClicked}
                    imageSrc={this.state.imageSrc}
                    wiki={this.state.wiki}
                />
            </div>
        );
    }
}

export default App;
