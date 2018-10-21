import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('(TrackList) tracks:');
    console.dir(this.props.tracks);
    return (
      <div className="TrackList">
          <ol>{this.props.tracks.map(t => (<li key={t.id}><Track onAdd={this.props.onAdd} track={t} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/></li>))}</ol>
      </div>
    );
    }
};

export default TrackList;
