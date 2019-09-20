import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Reviews from './reviews'
import {AddToCart} from '.'

class Singleitem extends Component {
  render() {
    if (!this.props.items.length) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
    let itemId = this.props.match.params.itemId
    let allItems = this.props.items
    let itemObj = allItems.filter(el => el.id === Number(itemId))[0]
    return (
      <div>
        <h3>{itemObj.name}</h3>
        <ul>
          <li>
            <img src={itemObj.photo} className="itemPhoto" />
          </li>
          <li>Price: {itemObj.price} </li>
          <li>Left in Stock: {itemObj.inventory}</li>
          <li>Description: {itemObj.description}</li>
        </ul>
        <Reviews id={itemObj.id} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

export default withRouter(connect(mapStateToProps)(Singleitem))
