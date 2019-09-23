import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Reviews from './reviews'
import UpdateItem from './updateitem'
import {fetchSingleItemThunk} from '../store/singleitem'
import {AddToCart} from '.'

class Singleitem extends Component {
  componentDidMount() {
    this.props.setItem(this.props.match.params.itemId)
  }

  render() {
    const isAdmin = this.props.isAdmin
    const itemObj = this.props.item || {}

    return !itemObj.id ? (
      <div>
        <h1>Loading...</h1>
      </div>
    ) : (
      <div>
        <div>
          <h3>{itemObj.name}</h3>
          <ul>
            <li>
              <img src={itemObj.photo} className="singleItemPhoto" />
            </li>
            <li>Price: {itemObj.price} </li>
            <li>Left in Stock: {itemObj.inventory}</li>
            <li>Description: {itemObj.description}</li>
            <li>
              Categories:{' '}
              {itemObj.categories ? (
                itemObj.categories.map(ctg => (
                  <span key={ctg.id}>
                    {ctg.name}{' '}
                    {isAdmin ? (
                      <span>
                        <button type="button" id={ctg.id}>
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
          </ul>

          <Reviews id={itemObj.id} />
        </div>
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
    setItem: id => dispatch(fetchSingleItemThunk(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Singleitem)
)
