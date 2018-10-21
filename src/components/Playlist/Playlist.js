import React from 'react';
import TrackList from '../Tracklist/TrackList.js';
import './Playlist.css';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.state = {};
  }
  render() {
    return (
      <div className="PlayList">
        <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="PlayList-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }
};

export default PlayList;
