import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {
  deleteUserThunk,
  fetchUsersThunk,
  promoteUserThunk
} from '../store/allusers'

class Allusers extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handlePromote = this.handlePromote.bind(this)
  }
  componentDidMount() {
    this.props.fetchUsers()
  }

  handleClick = evt => {
    evt.preventDefault()
    if (evt.target.id) {
      this.props.deleteUser(evt.target.id)
    }
  }

  handlePromote = evt => {
    evt.preventDefault()
    if (evt.target.id) {
      this.props.promoteUser(evt.target.id)
    }
  }

  render() {
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
              <button type="button" id={user.id}>
                Reset Password
              </button>
              <button type="button" id={user.id} onClick={this.handlePromote}>
                Change Admin Status
              </button>
              ID: {user.id} Email: {user.email} Admin:{' '}
              {user.isAdmin ? <span>YES</span> : <span>NO</span>}
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
    fetchUsers: () => dispatch(fetchUsersThunk()),
    promoteUser: id => dispatch(promoteUserThunk(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Allusers)
)
