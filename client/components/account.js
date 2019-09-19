import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Login} from './auth-form'
import {Link} from 'react-router-dom'

class Account extends Component {
  render() {
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
            <button> Submit </button>
          </p>
        </div>
        <div>
          <p>
            {' '}
            Update Password:
            <div />
            <input type="text" />
            <div />
            <button> Submit </button>
          </p>
        </div>
        <div>
          <Link to="/orders/history">Your Order History</Link>
        </div>
        <div>
          <br />
          <button>Log Out</button>
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

export default withRouter(connect(mapStateToProps)(Account))
