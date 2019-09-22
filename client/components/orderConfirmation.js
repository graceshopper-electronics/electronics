import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class OrderConfirmation extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="order-confirmation-view">
        <p>
          Thank you for shopping with us. You ordered VicTsing RGB Gaming Mouse
          Pad. We'll send a confirmation when your order ships.
        </p>
        <div className="estimated-delivery-date">
          <h3>
            Estimated Delivery Date: <br />
            <span>Monday, September 26, 2019 </span>
          </h3>
          <button className="view-or-manage-order">View or manage order</button>
          <div className="order-recap right">
            <p>
              Total Before Tax: $188.47 <br />
              Estimated Tax: $17.98
            </p>
            <p className="total">Order Total: $206.45</p>
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

export default withRouter(OrderConfirmation)
