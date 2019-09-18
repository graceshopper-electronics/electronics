import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchItemsThunk} from '../store/items'
/**
 * COMPONENT
 */

class Allitems extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    console.log(this)
    return (
      <div>
        <h3>Welcome, to all items</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItemsThunk())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Allitems)
)
