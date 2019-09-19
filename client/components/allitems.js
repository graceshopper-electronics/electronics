import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddToCart from './addToCart'

/**
 * COMPONENT
 */
import {withRouter, Link} from 'react-router-dom'
import ItemCard from './itemcard'

class Allitems extends Component {
  render() {
    const items = this.props.items
    return (
      <div>
        <h3>Welcome, to all items</h3>
        <div>
          {items.map(item => (
            <Link to={`items/${item.id}`} key={item.id}>
              <ItemCard item={item} key={item.id} />
            </Link>
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
