import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Allitems,
  Singleitem,
  OrderHistory,
  Account,
  Categories,
  SingleCategory,
  ViewCart,
  Checkout,
  OrderConfirmation,
  AllUsers,
  AllOrders
} from './components'
import {me} from './store'
import {fetchItemsThunk} from './store/items'
import {fetchCategoriesThunk} from './store/categories'
import {fetchOrderHistory} from './store/orderHistory'
import {fetchCartItems} from './store/cart'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const isAdmin = this.props.isAdmin
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/items/:itemId" component={Singleitem} />
        <Route path="/items" component={Allitems} />
        <Route path="/account" component={Account} />
        <Route path="/cart" component={ViewCart} />
        <Route path="/categories/:categoryId" component={SingleCategory} />
        <Route path="/categories" component={Categories} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderConfirmation" component={OrderConfirmation} />

        {isAdmin && (
          <Switch>
            <Route path="/users" component={AllUsers} />
            <Route path="/orders" component={AllOrders} />
          </Switch>
        )}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/orders/history" component={OrderHistory} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchItemsThunk())
      dispatch(fetchCategoriesThunk())
      dispatch(fetchCartItems())
      dispatch(fetchOrderHistory())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
