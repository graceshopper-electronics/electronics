import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {cancelOrder} from '../store/cart'

class OrderConfirmation extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
      orderId: '',
      canceled: false
    }
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount() {
    this.setState({
      items: this.props.location.state.items,
      orderId: this.props.location.state.orderId
    })
  }

  handleCancel() {
    this.props.cancel(this.state.orderId)
    this.setState({
      canceled: true
    })
  }

  render() {
    const items = this.state.items
    const tax = 9.85
    const orderTotal = items[0]
      ? items.reduce((acc, item) => {
          return acc + Number(item.price * item.orderdetails.itemQuantity)
        }, 0.0)
      : '0.00'
    const estimatedTax = Math.floor(orderTotal * 100 / tax) / 100

    return (
      <div className="order-confirmation-view">
        <p>
          Thank you for shopping with us. You ordered{' '}
          <span className="green">
            {items[0]
              ? items.length > 1
                ? `${items[0].name} and ${items.length - 1} other item(s)`
                : `${items[0].name}`
              : 'no items'}
          </span>. Your order number is {this.state.orderId}. We'll send a
          confirmation when your order ships.
        </p>
        <div className="estimated-delivery-date">
          <div>
            <h3>
              Estimated Delivery Date: <br />
              <span className="green">Monday, September 26, 2019 </span>
            </h3>
            <button className="manage-order">View or manage order</button>
            {!this.state.canceled ? (
              <button
                className="manage-order"
                onClick={() => {
                  this.handleCancel()
                }}
              >
                Cancel order
              </button>
            ) : (
              <div />
            )}
            {this.state.canceled ? (
              <div>
                <p>
                  A request for cancelation has been submitted. We'll send
                  confirmation once the request processes.
                </p>
              </div>
            ) : (
              <div />
            )}
          </div>
          <div className="order-recap">
            <p>
              Total Before Tax: ${orderTotal} <br />
              Estimated Tax: ${estimatedTax}
            </p>
            <p className="total price">
              Order Total: ${orderTotal + estimatedTax}
            </p>
          </div>
        </div>
        <p className="parting-message">
          We hope to see you again soon, <br />
          Team Apple
        </p>
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
    cancel: orderId => dispatch(cancelOrder(orderId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(OrderConfirmation))
