import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults.js';
import SearchBar from '../SearchBar/SearchBar.js';
import PlayList from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state={
        searchResults:[
          {
          id: '0ScgmigVOJr2mFsAtwFQmz',
          name: 'Fight Test',
          artist: 'The Flaming Lips',
          album: 'Yoshimi Battles The Pink Robots',
          uri: 'spotify:artist:16eRpMNXSQ15wuJoeqguaB'
      },
    ],
      playlistName:'New Playlist',
      playlistTracks:[{
        id: '0ScgmigVOJr2mFsAtwFQmz',
        name: 'Fight Test',
        artist: 'The Flaming Lips',
        album: 'Yoshimi Battles The Pink Robots',
        uri: 'spotify:artist:16eRpMNXSQ15wuJoeqguaB'
      },
    ]
    }
  }
  async componentDidMount() {
    let accessToken = await Spotify.getAccessToken();
    if (!accessToken) {
      accessToken = await Spotify.getAccessToken();
    }
    this.setState({accessToken});
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-PlayList">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList onNameChange={this.updatePlaylistName}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
  addTrack(track) {
    const matchTracks = this.state.playlistTracks.filter((t) => {return (t.id === track.id)});
    if (matchTracks.length === 0) {
      let updatePlaylist = this.state.playlistTracks.concat(track);
      this.setState({
        playlistTracks: updatePlaylist
      });
    }
  }
  removeTrack(track) {
    const list = this.state.playlistTracks.filter((t) => {return (t.id !== track.id)});
    this.setState({
      playlistTracks: list
    });
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  async savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(t => { return t.url });
    const playlistid = await Spotify.savePlaylist(this.state.playlistName, trackURIs, this.state.accessToken);
  }
  async search(term) {
    const results = await Spotify.search(term, this.state.accessToken);
    this.setState({
      searchResults: results,
    });
  }
}

export default App;
