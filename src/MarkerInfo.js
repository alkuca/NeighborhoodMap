import React, {Component} from 'react'
import './App.css'

class MarkerInfo extends Component{
    state = {
        image: []
    };

    getImage(){
        fetch("https://pixabay.com/api/?key=9542958-4d41c45ade8f4cf98b31ccc6e&q="+this.props.markerClicked+"&image_type=photo")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.hits.map(url =>  url.largeImageURL))
            .then(image => {
                this.setState({
                    image: image
                })
            });
    }


  async componentWillUpdate(){
        this.getImage();
  }


    render(){
        console.log(this.state.image);
        return(
            <div>
                <div className="marker-info">
                    <div className="info-content">
                        <p>{this.props.markerClicked}</p>
                        {this.state.image.map((img) =>
                            <img src={img} alt={this.props.markerClicked}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default MarkerInfo;

