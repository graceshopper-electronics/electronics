import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import CartItems from './cartItems'

class ViewCart extends React.Component {
  constructor() {
    super()
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
                    return (
                      acc + Number(item.price * item.orderdetails.itemQuantity)
                    )
                  }, 0.0)
                : '0.00'
            }`}
          </p>
          <button className="checkout">
            <Link to="/checkout">Proceed to Checkout</Link>
          </button>
        </div>
        <CartItems />
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

export default withRouter(connect(mapState)(ViewCart))
