import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchAllOrdersThunk, setSearchedOrders} from '../store/allorders'
import axios from 'axios'
import {publicDecrypt} from 'crypto'

let defaultState = {
  date: '',
  status: '',
  perPage: 0,
  offset: 0,
  orderNo: 0,
  orderStatus: '',
  email: ''
}

class AllOrders extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.pageClick = this.pageClick.bind(this)
    this.orderChange = this.orderChange.bind(this)
    this.orderInfoChange = this.orderInfoChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrders()
  }

  orderInfoChange(evt) {
    this.setState({
      orderNo: evt.target.name,
      orderStatus: evt.target.value,
      email: evt.target.name2
    })
  }

  async orderChange(evt) {
    let update = {
      status: this.state.orderStatus
    }
    try {
      await axios.put(`api/orders/${this.state.orderNo}`, update)
      this.props.fetchOrders()
    } catch (err) {
      this.setState({
        error: 'Could not update status'
      })
    }
  }

  pageClick(evt) {
    if (evt.target.value === 'NaN') {
      evt.target.value = 1
    }
    let obj = {offset: evt.target.value}
    this.handleClick(obj)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleClick(evt) {
    let limit = !this.state.perPage ? 15 : Number(this.state.perPage)
    let offset = !evt.offset ? 0 : Number(Number(evt.offset) * limit)
    let whereConditions = ''
    if (this.state.date) {
      whereConditions += `&date=${this.state.date}`
    }
    if (this.state.status) {
      whereConditions += `&status=${this.state.status}`
    }
    if (this.state.user) {
      whereConditions += `&user=${this.state.user}`
    }
    try {
      let result = await axios.get(
        `/api/orders?limit=${limit}&offset=${offset}${whereConditions}`
      )
      this.props.getOrders(result.data)
      this.setState({
        offset: evt.offset
      })
    } catch (err) {
      this.setState({
        error: `There was a problem filtering results!: ${err.message}`
      })
    }
  }

  render() {
    const list = this.props.allorders
    let orderTotal = 0
    return (
      <div>
        <div>
          <div>
            <div>
              <p>
                Sort By Date:
                <select
                  className="form-control"
                  name="date"
                  defaultValue=""
                  onChange={this.handleChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="ASC">Newest First</option>
                  <option value="DESC">Oldest First</option>
                  <option value="">Date Sort Off</option>
                </select>
                Filter By Status:
                <select
                  className="form-control"
                  name="status"
                  defaultValue=""
                  onChange={this.handleChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="">All</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Delivered">Delivered</option>
                </select>
                Sort By User Number:
                <input
                  type="number"
                  name="user"
                  defaultValue=""
                  onChange={this.handleChange}
                />
                Results Per Page:
                <select
                  className="form-control"
                  name="perPage"
                  defaultValue=""
                  onChange={this.handleChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
                <button type="button" onClick={this.handleClick}>
                  Submit Filters
                </button>
              </p>
            </div>
            <h3>All Orders</h3>
            <div>
              {list.map(order => (
                <ul key={order.id}>
                  <li> Status: {order.status}</li>
                  <li> Created Date: {order.createdAt.slice(0, 10)}</li>
                  <li>
                    {' '}
                    Updated Date:{' '}
                    {order.updatedAt
                      ? order.updatedAt.slice(0, 10)
                      : 'None'}{' '}
                  </li>
                  <li>
                    {' '}
                    Submission Date:{' '}
                    {order.submissionDate
                      ? order.submissionDate.slice(0, 10)
                      : 'None'}
                  </li>
                  <li> User: {order.userId} </li>
                  <select
                    className="form-control"
                    name={order.id}
                    name2={order.user ? order.user.email : 'guest'}
                    defaultValue=""
                    onChange={this.orderInfoChange}
                  >
                    <option value="" disabled selected>
                      Update Status
                    </option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Canceled">Cancelled</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button onClick={this.orderChange}>apply</button>
                  <li>
                    <div>
                      <h6>Order Details</h6>
                      {order.items.map(item => (
                        <ul key={item.id}>
                          <li>{item.name}</li>
                          <li>{item.orderdetails.itemQuantity}</li>
                          <li>{item.orderdetails.priceAtPurchase}</li>
                        </ul>
                      ))}
                    </div>
                  </li>
                </ul>
              ))}
            </div>
            {Number(this.state.offset) ? (
              <div>
                <button
                  type="button"
                  value={Number(this.state.offset) - 1}
                  onClick={this.pageClick}
                >
                  Previous Page
                </button>{' '}
                <button
                  type="button"
                  value={Number(this.state.offset) + 1}
                  onClick={this.pageClick}
                >
                  Next Page
                </button>
                <p> </p>
                <br />
              </div>
            ) : (
              <div>
                {' '}
                <button
                  type="button"
                  value={Number(this.state.offset) + 1}
                  onClick={this.pageClick}
                >
                  Next Page
                </button>
                <p> </p>
                <br />
              </div>
            )}
          </div>
        </div>
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
    fetchOrders: () => dispatch(fetchAllOrdersThunk()),
    getOrders: orders => dispatch(setSearchedOrders(orders)),
    updateOrders: update => dispatch(updateOrderThunk(update))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllOrders)
)
