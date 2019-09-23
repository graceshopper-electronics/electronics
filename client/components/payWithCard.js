import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class PayWithCard extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {}

  render() {
    return (
      <form handleSubmit="" name="">
        <label htmlFor="email">Email</label>
        <input name="email" type="text" />

        <br />

        <label htmlFor="card-information">Card Information</label>
        <input
          name="card-information"
          defaultValue="1234 5678 1234 5678"
          type="text"
        />
        <input name="card-information" defaultValue="MM/YY" type="text" />
        <input name="card-information" defaultValue="CVC" type="text" />

        <br />

        <label htmlFor="name-on-card">Name on card</label>
        <input name="name-on-card" />

        <br />

        <label htmlFor="country-region">Country or region</label>
        <input name="country-region" />

        <button type="submit" className="confirm-payment">
          Confirm payment
        </button>
      </form>
    )
  }
}

export default withRouter(PayWithCard)
