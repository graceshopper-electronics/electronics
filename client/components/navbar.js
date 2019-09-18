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
      <p>
        <Link to="/items">All items</Link>
      </p>
    </div>
    <div className="link">
      <input className="search" type="text" />
      <button className="search-button">
        <div className="fa fa-search fa-3x" />
      </button>
    </div>
    <Link to="/" className="link">
      Account
    </Link>
    <Link to="/orders/history" className="link">
      Orders
    </Link>
    <Link to="/" className="link">
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
