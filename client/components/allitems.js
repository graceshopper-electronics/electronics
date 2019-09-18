import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

/**
 * COMPONENT
 */

class Allitems extends Component {
  render() {
    const items = this.props.items
    return (
      <div>
        <h3>Welcome, to all items</h3>
        <div>
          {items.map(item => (
            <div key={item.id} className="wrap">
              <img src={item.photo} className="itemPhoto" />
              <ul>
                <li>Price: {item.price}</li>
                <li>Name:{item.name}</li>
                <li>Inventory: {item.inventory}</li>
              </ul>
            </div>
          ))}
        </div>
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
