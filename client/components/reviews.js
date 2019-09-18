import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class Reviews extends Component {
  render() {
    //const reviews = this.props.items
    return (
      <div>
        <h1>Placeholder for Reviews</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews
  }
}

export default withRouter(connect(mapStateToProps)(Reviews))
