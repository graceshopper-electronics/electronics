import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Login} from './auth-form'
import {fetchUsersThunk} from '../store/allusers'
import {logout} from '../store'
import axios from 'axios'

let defaultState = {
  password1: '',
  password2: '',
  email: '',
  err: false,
  message: ''
}

class Account extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleLogout = this.handleLogout.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleLogout() {
    this.props.handleClick()
  }

  async handleEmail(evt) {
    let update = {
      email: this.state.email
    }
    evt.preventDefault()
    try {
      await axios.put(`/api/users/${this.props.user.id}`, update)
      this.props.user.email = this.state.email
      this.setState(defaultState)
    } catch (err) {
      this.setState({
        error: `There was a problem changing email!: ${err.message}`
      })
    }
  }

  async handlePassword(evt) {
    evt.preventDefault()
    if (this.state.pasword1 !== this.state.password2) {
      this.setState({
        message: 'Passwords Do Not Match!',
        err: true
      })
    }
    if (!this.state.password1) {
      this.setState({
        message: 'Field is Empty!',
        err: true
      })
    } else if (this.state.password1 === this.state.password2) {
      let update = {password: this.state.password1}
      try {
        await axios.put(`/api/users/${this.props.user.id}`, update)
        this.setState(defaultState)
      } catch (err) {
        this.setState({
          error: `There was a problem changing password!: ${err.message}`
        })
      }
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

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
          <form onSubmit={this.handleEmail}>
            <p>
              Update Email:
              <br />
              <input
                type="text"
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
              />
              <br />
              <button type="submit"> Submit </button>
            </p>
          </form>
        </div>
        <div>
          <form onSubmit={this.handlePassword}>
            <p>
              {' '}
              Update Password:
              <br />
              <input
                type="password"
                name="password1"
                onChange={this.handleChange}
                value={this.state.password1}
              />
              <br />
              <input
                type="password"
                name="password2"
                onChange={this.handleChange}
                value={this.state.password2}
              />
              <br />
              <button type="submit"> Submit </button>
              {this.state.err ? (
                <span className="warning">{this.state.message}</span>
              ) : (
                <div />
              )}
            </p>
          </form>
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
          <button onClick={this.handleLogout}>Log Out</button>
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

const mapDispatch = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsersThunk()),
    handleClick: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Account))
