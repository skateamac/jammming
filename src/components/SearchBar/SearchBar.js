import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {
      term: ''
    };
  }
  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
  search() {
    console.log(`from Searchbar...`)
    let result = this.props.onSearch(this.state.term);
  }
  handleTermChange(event) {
    this.setState({
      term: event.target.value
    })
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.search()
    }
  }
}

export default SearchBar;
