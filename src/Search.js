import React from 'react';
import './App.css'
import { Debounce } from 'react-throttle';

function Search(props) {
    return(
        <div className="search-container">
            <div className="input-wrapper">
                <Debounce time="300" handler="onChange">
                    <input type="text"  placeholder="Search a location..."
                           onChange={(event) => {
                               props.searchForLocation(event);
                               }}/>
                </Debounce>
            </div>
        </div>
    )
}

export default Search;