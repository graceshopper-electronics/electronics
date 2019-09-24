import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'

const defaultState = {
  orderHistory: []
}

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  async componentDidMount() {
    console.log(this.props)
    const res = await axios.get(`/api/orders/history/${this.props.user.id}`)
    this.setState({orderHistory: res.data})
  }

  render() {
    console.log(this.state)
    let displayOrders = []
    if (!this.state.orderHistory || !this.state.orderHistory) {
      return (
        <div>
          <h2>Order History Not Found</h2>
        </div>
      )
    } else {
      displayOrders = this.state.orderHistory.sort(function(a, b) {
        a = new Date(a.submissionDate)
        b = new Date(b.submissionDate)
        return a > b ? -1 : a < b ? 1 : 0
      })
      displayOrders.map(
        order =>
          (order.total = order.items.reduce(function(acc, item) {
            return acc + Number(item.orderdetails.priceAtPurchase)
          }, 0))
      )
    }
    console.log('order stuff')
    return (
      <div id="orderhistory">
        <h1>Your Order History</h1>
        <div>
          {displayOrders.map(order => (
            <div className="singleOrder" key={order.id}>
              <h4>
                Order From:{' '}
                {order.submissionDate
                  ? order.submissionDate.slice(0, 10)
                  : 'N/A'}
              </h4>
              <h4>Order Status: {order.status}</h4>
              {order.items.map(item => (
                <Link to={`items/${item.id}`} key={item.id}>
                  <div className="wrap" key={item.id}>
                    <img src={item.photo} className="itemPhoto" />
                    <ul>
                      <li>{item.name}</li>
                      <li>{item.description}</li>
                      <li>
                        ${Number(item.orderdetails.priceAtPurchase).toFixed(2)}
                      </li>
                    </ul>
                  </div>
                </Link>
              ))}
              <div>Order Total: ${order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderHistory: state.orderHistory,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(OrderHistory))
