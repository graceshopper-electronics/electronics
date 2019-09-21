import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddToCart from './addToCart'
import AddNewItem from './addnewitem'

/**
 * COMPONENT
 */
import {withRouter, Link} from 'react-router-dom'
import ItemCard from './itemcard'

class Allitems extends Component {
  render() {
    const items = this.props.items
    const isAdmin = this.props.isAdmin
    return (
      <div>
        <h3>All Products View</h3>
        <div>
          <div>
            {isAdmin ? (
              <div>
                <AddNewItem />
              </div>
            ) : (
              <div />
            )}
          </div>
          <div>
            {items.map(item => {
              return (
                <div key={item.id}>
                  <ItemCard item={item} />
                  <AddToCart item={item} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    isAdmin: state.user.isAdmin
  }
}

export default withRouter(connect(mapStateToProps)(Allitems))
