import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addCartItem} from '../store/cart'

const AddToCart = props => {
  const item = props.item
  return (
    <button
      className="add-to-cart"
      onClick={() => {
        props.addItem(item)
      }}
    >
      Add to cart
    </button>
  )
}

const mapDispatch = dispatch => {
  return {
    addItem: item => dispatch(addCartItem(item))
  }
}

export default withRouter(connect(null, mapDispatch)(AddToCart))
