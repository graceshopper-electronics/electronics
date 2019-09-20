import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {deleteUserThunk, fetchUsersThunk} from '../store/allusers'

class Allusers extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = evt => {
    evt.preventDefault()
    if (evt.target.id) {
      this.props.deleteUser(evt.target.id)
      this.props.fetchUsers()
    }
  }

  render() {
    console.log('inside allusers', this.props)
    const list = this.props.allUsers
    return (
      <div>
        <h3>All Users</h3>
        <ul className="users">
          {list.map(user => (
            <li key={user.id}>
              <button
                type="button"
                className="fa fa-user-times"
                id={user.id}
                onClick={evt => this.handleClick(evt)}
              />
              <button type="button">Reset Password</button>
              <button type="button">Set as Admin</button>
              ID: {user.id} Email: {user.email}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: id => dispatch(deleteUserThunk(id)),
    fetchUsers: () => dispatch(fetchUsersThunk())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Allusers)
)
