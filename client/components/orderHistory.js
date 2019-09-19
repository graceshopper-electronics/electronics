import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'

class OrderHistory extends Component {
  // constructor() {
  //   super()
  //   this.state = defaultState
  // }

  // async componentDidMount() {
  //   console.log('this is a test')
  //   const orderHistory = await this.props.getHistory()
  //   this.setState(orderHistory)
  //   console.log(this.state, this.props, orderHistory)
  // }
  render() {
    let displayOrders = []
    if (!this.props.orderHistory.length) {
      return (
        <div>
          <h2>Loading User History....</h2>
        </div>
      )
      // let displayOrders = this.props.orderHistory.filter(
      //   order => order.status !== 'inCart'
      // )
      // displayOrders.sort(function(a, b) {
      //   a = new Date(a.submissionDate)
      //   b = new Date(b.submissionDate)
      //   return a > b ? -1 : a < b ? 1 : 0
      // })
    } else {
      displayOrders = this.props.orderHistory.filter(
        order => order.status !== 'inCart'
      )
      displayOrders.sort(function(a, b) {
        a = new Date(a.submissionDate)
        b = new Date(b.submissionDate)
        return a > b ? -1 : a < b ? 1 : 0
      })
      displayOrders.map(
        order =>
          (order.total = order.items
            .reduce(function(acc, item) {
              item.orderdetails.priceAtPurchase =
                item.orderdetails.priceAtPurchase.slice(
                  0,
                  item.orderdetails.priceAtPurchase.length - 3
                ) +
                item.orderdetails.priceAtPurchase.slice(
                  item.orderdetails.priceAtPurchase.length - 2
                )
              return acc + Number(item.orderdetails.priceAtPurchase)
            }, 0)
            .toString())
      )
    }
    return (
      <div id="orderhistory">
        <h1>Your Order History</h1>
        <div>
          {displayOrders.map(order => (
            <div className="singleOrder" key={order.id}>
              <h4>Order From: {order.submissionDate.slice(0, 10)}</h4>
              <h4>Order Status: {order.status}</h4>
              {order.items.map(item => (
                <Link to={`items/${item.id}`}>
                  <div className="wrap" key={item.id}>
                    <img src={item.photo} className="itemPhoto" />
                    <ul>
                      <li>{item.name}</li>
                      <li>{item.description}</li>
                      <li>
                        ${item.orderdetails.priceAtPurchase.slice(
                          0,
                          item.orderdetails.priceAtPurchase.length - 2
                        ) +
                          '.' +
                          item.orderdetails.priceAtPurchase.slice(-2)}
                      </li>
                    </ul>
                  </div>
                </Link>
              ))}
              <div>
                Order Total: ${order.total.slice(0, order.total.length - 2) +
                  '.' +
                  order.total.slice(-2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderHistory: state.orderHistory
  }
}
export default withRouter(connect(mapStateToProps)(OrderHistory))
