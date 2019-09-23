import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {deleteCartItem, updateQuantity} from '../store/cart'

class ViewCart extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleDelete(itemId) {
    this.props.delete(itemId)
  }

  handleChange(event, itemId) {
    const newQuantity = event.target.value
    this.props.updateQuantity(itemId, newQuantity)
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
                ? items
                    .reduce((acc, item) => {
                      return (
                        acc +
                        Number(item.price * item.orderdetails.itemQuantity)
                      )
                    }, 0)
                    .toFixed(2)
                : '0.00'
            }`}
          </p>
          <button className="checkout">Proceed to Checkout</button>
        </div>
        {items[0] ? (
          items.map(item => (
            <div className="wrap" key={item.id}>
              <Link to={`/items/${item.id}`} className="wrap">
                <img src={item.photo} className="itemPhoto" />
                <ul>
                  <li className="item-name">{item.name}</li>
                  <li className="price">
                    ${(item.price * item.orderdetails.itemQuantity).toFixed(2)}
                  </li>
                </ul>
              </Link>
              <div className="right">
                <input
                  className="cart-quantity"
                  type="number"
                  name="quantity"
                  defaultValue={item.orderdetails.itemQuantity}
                  onChange={() => {
                    this.handleChange(event, item.id)
                  }}
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
    delete: itemId => dispatch(deleteCartItem(itemId)),
    updateQuantity: (itemId, quantity) =>
      dispatch(updateQuantity(itemId, quantity))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ViewCart))
