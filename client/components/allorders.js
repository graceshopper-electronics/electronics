import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchAllOrdersThunk} from '../store/allorders'

class AllOrders extends Component {
  //   constructor(props) {
  //     super(props)
  //     //this.handleClick = this.handleClick.bind(this)
  //   }

  componentDidMount() {
    this.props.fetchOrders()
  }

  //   handleClick = evt => {
  //     evt.preventDefault()
  //     if (evt.target.id) {
  //       this.props.deleteUser(evt.target.id)
  //     }
  //   }

  render() {
    const list = this.props.allorders
    let orderTotal = 0
    return (
      <div>
        <h3>All Orders</h3>

        {list.map(order => (
          <ul key={order.id} className="allorders">
            <li> Status: {order.status}</li>
            <li> Created Date: {order.createdAt}</li>
            <li> Updated Date: {order.updatedAt} </li>
            <li> Submission Date: {order.submissionDate}</li>
            <li> User: {order.userId} </li>
            <li>
              <h6>Order Details</h6>
              {order.items.map(item => (
                <ul key={item.id} className="allordersdetails">
                  <li>{item.name}</li>
                  <li>{item.orderdetails.itemQuantity}</li>
                  <li>{item.orderdetails.priceAtPurchase}</li>
                </ul>
              ))}
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allorders: state.allorders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchAllOrdersThunk())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllOrders)
)
