import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Reviews from './reviews'
import UpdateItem from './singleitem'
import {fetchSingleItemThunk} from '../store/singleitem'

class Singleitem extends Component {
  componentDidMount() {
    this.props.setItem(this.props.match.params.itemId)
  }

  render() {
    console.log('INSIDE SINGLE ITEM', this.props)
    const isAdmin = this.props.isAdmin
    const itemObj = this.props.item || {}

    if (!itemObj.name) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
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

        <div>
          {isAdmin ? (
            <div>
              <UpdateItem />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    item: state.singleitem,
    items: state.items,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setItem: id => dispatch(fetchSingleItemThunk(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Singleitem)
)
