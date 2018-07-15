import React, {Component} from 'react';
import './App.css'
import { Debounce } from 'react-throttle';

class Search extends Component {
    state = {
        query: ""

    };

    searchForLocation(event){
        this.setState({query: event.target.value});
    }


    render(){


        return(
            <div className="search-books-bar">
                <div className="input-wrapper">
                    <Debounce time="200" handler="onChange">
                        <input type="text"  placeholder="Search a location..."
                               onChange={(event) => {
                                   this.searchForLocation(event);
                                   this.props.getQuery(this.state.query);
                                       }}/>
                    </Debounce>
                </div>
            </div>
        )
    }
}

export default Search;