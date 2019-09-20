import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {deleteCartItem} from '../store/cart'

class ViewCart extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(itemId) {
    this.props.delete(itemId)
  }

  render() {
    const items = this.props.cart.items || []
    return (
      <div id="cart-side-bar">
        <div className="cart-header">
          <p>
            Subtotal:{' '}
            {`$${
              items[0]
                ? items.reduce((acc, item) => {
                    return acc + Number(item.price)
                  }, 0.0)
                : '0.00'
            }`}
          </p>
          <button className="checkout">Proceed to Checkout</button>
        </div>
        {items[0] ? (
          items.map(item => (
            <div key={item.id} className="wrap">
              <img src={item.photo} className="itemPhoto" />
              <ul>
                <li className="item-name">{item.name}</li>
                <li className="price">${item.price}</li>
              </ul>
              <input
                className="cart-quantity"
                type="number"
                name="quantity"
                defaultValue="1"
                step="1"
                min="1"
                max="100"
              />
              <button
                className="delete"
                onClick={() => {
                  this.handleDelete(item.id)
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div>
            <p>Your Cart Is Currently Empty</p>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    delete: itemId => dispatch(deleteCartItem(itemId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ViewCart))
