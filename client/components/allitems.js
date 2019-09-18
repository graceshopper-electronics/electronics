import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class Allitems extends Component {
  render() {
    const items = this.props.items
    return (
      <div>
        <h3>Welcome, to all items</h3>
        <div>
          {items.map(item => (
            <div key={item.id} className="wrap">
              <Link to={`/items/${item.id}`}>
                <img src={item.photo} className="itemPhoto" />
              </Link>
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
