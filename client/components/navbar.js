import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Menu from './menu'
import {fetchSearchItems} from '../../client/store/items'

let defaultState = {
  searchValue: ''
}

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.searchValue === 'monitors') {
      window.location.href = `https://www.amazon.com/s?k=$monitors&ref=nb_sb_noss_1`
    } else {
      let search = this.state.searchValue
      this.props.getItems(search)
      //window.location.href = '/items'
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn
    return (
      <div className="nav">
        <div className="dropdown">
          <button className="dropbtn">
            <div className="fa fa-bars fa-2x link" />
          </button>
          <div id="myDropdown" className="dropdown-content">
            <Menu />
          </div>
        </div>

        <div className="title link">
          <Link to="/" className="link">
            <i className="fa fa-amazon fa-2x logo" />
          </Link>
        </div>

        <div>
          <Link to="/categories" className="link">
            Categories
          </Link>
        </div>

        <div className="link">
          <input
            className="search"
            name="searchValue"
            type="text"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
          <button className="search-button" onClick={this.handleSubmit}>
            <Link to="/items" className="fa">
              <i className="fa fa-search fa-3x" />
            </Link>
          </button>
        </div>

        <Link to="/items" className="link">
          Products
        </Link>

        <Link to="/account" className="link">
          {this.props.isLoggedIn ? 'Your Account' : 'Log In'}
        </Link>

        {isLoggedIn ? (
          <Link to="/orders/history" className="link">
            Orders
          </Link>
        ) : (
          <div />
        )}
        <Link to="/cart" className="link">
          <div className="fa fa-shopping-cart fa-lg" />
        </Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getItems: search => dispatch(fetchSearchItems(search))
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
