import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="nav">
    <div className="fa fa-bars fa-2x link" />
    <div className="title link">
      <p>#TeamApple</p>
    </div>
    <div>
      <Link to="/items" className="link">
        All items
      </Link>
      <Link to="/categories" className="link">
        Categories
      </Link>
    </div>
    <div className="link">
      <input className="search" type="text" />
      <button className="search-button">
        <div className="fa fa-search fa-3x" />
      </button>
    </div>
    <Link to="/items" className="link">
      Products
    </Link>
    <Link to="/account" className="link">
      {isLoggedIn ? 'Your Account' : 'Log In'}
    </Link>
    <Link to="/orders/history" className="link">
      Orders
    </Link>
    <Link to="/cart" className="link">
      <div className="fa fa-shopping-cart fa-lg" />
    </Link>
  </div>
)

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
    }
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
