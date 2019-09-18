import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/orderHistory'
import {NavLink} from 'react-router-dom'

const defaultState = {
  orderHistory: []
}

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  componentDidMount() {
    this.props.getOrderHistory()
  }
  render() {
    const displayOrders = this.props.orderHistory.filter(
      order => order.status !== 'inCart'
    )
    displayOrders.sort(function(a, b) {
      a = new Date(a.submissionDate)
      b = new Date(b.subissionDate)
      return a > b ? -1 : a < b ? 1 : 0
    })
    return (
      <div id="orderhistory">
        {displayOrders.length ? (
          <div>
            <h2>No Order History Found!</h2>
          </div>
        ) : (
          <div>{displayOrders.map(order => <div id="singleOrder" />)}</div>
        )}
      </div>
    )
  }
}
