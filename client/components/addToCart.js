import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addCartItem} from '../store/cart'

class AddToCart extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart() {
    const item = this.props.item
    this.props.addItem(item)
  }

  render() {
    return (
      <button
        className="add-to-cart"
        onClick={() => {
          this.handleAddToCart()
        }}
      >
        Add to cart
      </button>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addItem: item => dispatch(addCartItem(item))
  }
}

export default withRouter(connect(null, mapDispatch)(AddToCart))
