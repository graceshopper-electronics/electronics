import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Reviews from './reviews'
import UpdateItem from './updateitem'
import {fetchSingleItemThunk, unassignCategoryThunk} from '../store/singleitem'
import {AddToCart} from '.'

class Singleitem extends Component {
  constructor(props) {
    super(props)
    this.handleUnassign = this.handleUnassign.bind(this)
  }
  componentDidMount() {
    this.props.setItem(this.props.match.params.itemId)
  }

  handleUnassign(evt) {
    const categoryId = {id: evt.target.id}
    const itemId = this.props.item.id

    this.props.unassign(itemId, categoryId)
  }

  render() {
    const isAdmin = this.props.isAdmin
    const itemObj = this.props.item || {}

    return !itemObj.id ? (
      <div>
        <h1>
          <i className="fa fa-spinner fa-spin" />Loading...
        </h1>
      </div>
    ) : (
      <div className="single-item-page">
        <div className="flex-display item-info">
          <div className="photo-sidebar">
            <img src={itemObj.photo} />
            <img src={itemObj.photo} />
            <img src={itemObj.photo} />
            <img src={itemObj.photo} />
          </div>
          <div>
            <img src={itemObj.photo} className="single-item-photo" />
          </div>
          <ul>
            <li>
              <h3>{itemObj.name}</h3>
            </li>
            <li className="single-price">${itemObj.price} </li>
            {itemObj.inventory ? (
              itemObj.inventory < 10 ? (
                <li className="orange">
                  Only {itemObj.inventory} left in stock
                </li>
              ) : (
                <li className="green">Currently in Stock</li>
              )
            ) : (
              <li className="red">Out of Stock</li>
            )}
            <li>Description: {itemObj.description}</li>
            <li>
              Categories:{' '}
              {itemObj.categories ? (
                itemObj.categories.map(ctg => (
                  <span key={ctg.id}>
                    {ctg.name}{' '}
                    {isAdmin ? (
                      <span>
                        <button
                          type="button"
                          id={ctg.id}
                          onClick={this.handleUnassign}
                        >
                          X
                        </button>
                      </span>
                    ) : (
                      <span />
                    )}
                  </span>
                ))
              ) : (
                <span>No Categories for this Item</span>
              )}
            </li>
            {itemObj.inventory ? (
              <AddToCart item={itemObj} />
            ) : (
              <h3>Unavailable for Cart</h3>
            )}
          </ul>
        </div>

        <Reviews id={itemObj.id} />
        <div>
          {' '}
          {isAdmin ? (
            <div>
              <UpdateItem setItem={this.props.setItem} />
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
    setItem: id => dispatch(fetchSingleItemThunk(id)),
    unassign: (itemid, categoryid) =>
      dispatch(unassignCategoryThunk(itemid, categoryid))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Singleitem)
)
