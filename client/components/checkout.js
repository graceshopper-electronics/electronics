import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {placeOrder, fetchCartItems} from '../store/cart'
import CartItems from './cartItems'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadCartItems()
  }

  handleClick() {
    this.props.placeOrder(this.props.cart.id)
  }

  render() {
    const items = this.props.cart.items || []
    const orderTotal = items[0]
      ? items.reduce((acc, item) => {
          return acc + Number(item.price * item.orderdetails.itemQuantity)
        }, 0.0)
      : '0.00'

    return (
      <div className="checkout-view">
        <header className="checkout-header">
          <h1>
            <i className="fa fa-amazon fa-2x" /> Checkout ({items.length}{' '}
            item(s))
          </h1>
        </header>

        <div className="shipping-address">
          <h3>1 Shipping Adresss</h3>
          <div className="user-address-info">
            <p>
              Christopher Choi <br />
              1149 DeerField Lane <br />
              Lake Forest, IL 61820-7109
            </p>
          </div>
          <button className="change">Change</button>
        </div>

        <div className="payment-method">
          <h3>2 Payment Method</h3>
          <div className="user-payment-info">
            <p>
              Amazon Store Card ending in 7734 <br />
              Add gift card or promotion code <br />
              Apply Amazon Store Card reward points
            </p>
          </div>
          <button className="change">Change</button>
        </div>

        <div className="review-items">
          <h3>3 Review Items and Shipping</h3>
          <CartItems />
        </div>

        <div className="place-order-footer">
          <button onClick={this.handleClick} className="place-order-button">
            <Link to="/orderConfirmation" className="remove-decoration">
              Place your order
            </Link>
          </button>
          <p>
            Order total: <span className="price">${orderTotal}</span>
          </p>
        </div>

        <div className="place-order-sidebar">
          <button className="place-order-button">
            <Link to="/orderConfirmation" className="remove-decoration">
              Place your order
            </Link>
          </button>
          <div className="order-summary">
            <h3>Order Summary: </h3>
            <hr />
            <p>Item(s): {items.length}</p>
            <p>Shipping and handling:</p>
            <p>Total before tax:</p>
            <p>Estimated tax to be collected:</p>
            <p>Total:</p>
            <p>Gift card:</p>
            <p>Reward Points:</p>
            <hr />
          </div>
          <h3>
            Order Total: <span className="price">${orderTotal}</span>
          </h3>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    placeOrder: orderId => dispatch(placeOrder(orderId)),
    loadCartItems: () => dispatch(fetchCartItems())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Checkout))
