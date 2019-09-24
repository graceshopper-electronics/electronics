import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

let defaultState = {
  password1: '',
  password2: '',
  reset: false
}

class Password extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handlePassword = this.handlePassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  /**
   * COMPONENT
   */

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
        let result = await axios.put(`/api/users/${this.props.user.id}`, update)
        console.log(result)
        this.setState({
          password1: '',
          password2: '',
          reset: true
        })
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
    console.log('is this thing on', this.state)
    return (
      <div>
        {this.props.user.resetPassword ? (
          <div>
            {!this.state.reset ? (
              <div>
                <h3>Your Password is Out of Date. Please Update:</h3>
                <div />
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
            ) : (
              <div>
                <h3>Thank You!</h3>
              </div>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Password)

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
