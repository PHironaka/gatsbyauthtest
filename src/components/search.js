import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'
import SearchIcon from './searchIcon'
import styled from 'styled-components'

const SearchActive = styled.div`
  cursor: pointer;
  position: relative;
  margin-bottom:2em;
`

const Results = styled.div`
    position: fixed;
    width: 100%;
    height: 20em;
    top: -20em;
    left: 0;
    right: 0;
    white-space: nowrap;
    z-index: 9999;
    background: #fff;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cc000000', endColorstr='#1a000000', GradientType=0);
    opacity: 0;
    visibility: hidden;
    -webkit-transition: 500ms ease all;
    -moz-transition: 500ms ease all;
    transition: 500ms ease all;
  }

  &.is-active {
    top: 0;
    opacity: 1;
    visibility: visible;
  }
`

export default class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      isActive: false,
    }
  }

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.search-button'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {
     // Add a click event on each of them
       $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {
 
         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);
 
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');
 
       });
     });
   }
 }

  render () {
    return (
      <div>
        <Results id="searchForm" className={`navbar-item ${this.state.isActive ? 'is-active' : ''}`}>
          <input
            className='input navbar-link is-rounded is-primary'
            type='text'
            value={this.state.query}
            onChange={this.search}
            placeholder='Search'
          />
          <div className='navbar-dropdown'>
            {this.state.results.map(page => (
              <Link className='navbar-item' key={page.id} to={page.slug}>{page.title}</Link>
            ))}
          </div>
        </Results>
          <SearchActive className="search-button" data-target="searchForm">
            <SearchIcon />
          </SearchActive>
      </div>
    
    )
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : Index.load(this.props.searchIndex);

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true }) // Accept partial matches
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
      isActive: !!query,
    })
  };
}
