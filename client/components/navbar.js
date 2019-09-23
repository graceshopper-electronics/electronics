import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Menu from './menu'

class Navbar extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    const content = 'monitors'
    console.log('hit submit, content is: ', content)
    window.location.href = `https://www.amazon.com/s?k=${content}&ref=nb_sb_noss_1`
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
          <i className="fa fa-amazon fa-2x logo" />
        </div>

        <div>
          <Link to="/categories" className="link">
            Categories
          </Link>
        </div>

        <div className="link">
          <input className="search" name="monitors" type="text" />
          <button className="search-button" onClick={this.handleSubmit}>
            <i className="fa fa-search fa-3x" />
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
