import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ItemCard from './itemcard'

class Allitems extends Component {
  render() {
    const items = this.props.items
    return (
      <div>
        <h3>Welcome, to all items</h3>
        <div>{items.map(item => <ItemCard item={item} key={item.id} />)}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

export default withRouter(connect(mapStateToProps)(Allitems))
