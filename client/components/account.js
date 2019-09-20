import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Login} from './auth-form'
import {fetchUsersThunk} from '../store/allusers'

class Account extends Component {
  render() {
    const isAdmin = this.props.user.isAdmin
    if (!this.props.user.id) {
      return (
        <div>
          <h1>You Are Not Logged In!</h1>
          <Login />
        </div>
      )
    }
    return (
      <div>
        <div>
          <h1>Hello, {this.props.user.email}</h1>
        </div>
        <p>Your Email: {this.props.user.email}</p>
        <div>
          <p>
            Update Email:
            <div />
            <input type="text" />
            <div />
            <button type="button"> Submit </button>
          </p>
        </div>
        <div>
          <p>
            {' '}
            Update Password:
            <div />
            <input type="text" />
            <div />
            <button type="button"> Submit </button>
          </p>
        </div>
        <div>
          <Link to="/orders/history">Your Order History</Link>
        </div>
        <div>
          {isAdmin ? (
            <div>
              <button type="button" onClick={() => this.props.fetchUsers()}>
                <Link to="/users">Manage Users</Link>
              </button>
              <button type="button">
                <Link to="/items">Manage Products</Link>
              </button>
              <button type="button">
                <Link to="/orders">Manage Orders</Link>
              </button>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div>
          <br />
          <button type="button">Log Out</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsersThunk())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))
