import React from 'react';
import TrackList from '../Tracklist/TrackList.js';
import './SearchResults.css';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
      </div>
    );
  }
}

export default SearchResults;
