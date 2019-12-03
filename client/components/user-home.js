import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//import Password from './password'
import {withRouter} from 'react-router-dom'
/**
 * COMPONENT
 */

class UserHome extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  // componentDidMount() {
  //   this.setState({})
  // }

  render() {
    console.log('INSIDE USER HOME', this.props)
    const email = this.props.email || ''

    return (
      <div>
        <h1>Welcome, {email}</h1>
        {/* <Password /> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default withRouter(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
