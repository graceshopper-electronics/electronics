import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddToCart from './addToCart'
import AddNewItem from './addnewitem'
import {deleteItemThunk} from '../store/items'

/**
 * COMPONENT
 */
import {withRouter, Link} from 'react-router-dom'
import ItemCard from './itemcard'

class Allitems extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = evt => {
    evt.preventDefault()
    if (evt.target.id) {
      this.props.deleteItem(evt.target.id)
    }
  }

  render() {
    const items = this.props.items
    const isAdmin = this.props.isAdmin
    return (
      <div>
        <h3>All Products View</h3>
        <div>
          <div>
            {isAdmin ? (
              <div>
                <AddNewItem />
              </div>
            ) : (
              <div />
            )}
          </div>
          <div>
            {items.map(item => {
              return (
                <div key={item.id}>
                  <ItemCard item={item} />
                  <AddToCart item={item} />
                  <div>
                    {isAdmin ? (
                      <div>
                        <button
                          type="button"
                          id={item.id}
                          onClick={evt => this.handleClick(evt)}
                        >
                          Delete Item
                        </button>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => dispatch(deleteItemThunk(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Allitems)
)
