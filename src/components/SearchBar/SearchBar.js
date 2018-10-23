import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      term: ''
    };
  }
  handleTermChange(event) {
    this.setState({
      term: event.target.value
    })
  }
  handleSubmit(e) {
    this.props.onSearch(this.state.term);
    e.preventDefault();
  }
  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit} className="SearchBar">
          <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
          <input type="submit" value="SEARCH" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
