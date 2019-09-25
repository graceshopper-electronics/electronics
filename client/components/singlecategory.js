import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ItemCard from './itemcard'
import Advertisements from './advertisements'

import {fetchByCategoryThunk} from '../store/singlecategoryitems'

// function ascending(a, b) {
//   if (a.price > b.price) {
//     return b
//   } else {
//     return a
//   }
// }

// function descending(a, b) {
//   if (a.price > b.price) {
//     return a
//   } else {
//     return b
//   }
// }

class SingleCategory extends Component {
  // constructor(props) {
  //   super(props)
  //   this.handChange = this.handleChange.bind(this)
  //   // this.state = {
  //   //   singlecategoryitems: []
  //   // }
  // }

  componentDidMount() {
    this.props.getItemsByCat(this.props.match.params.categoryId)
  }

  // handleChange(evt) {
  //   if (evt.target.value === 'ASC') {
  //   }
  // }

  render() {
    const catName = this.props.categories.reduce((accum, curr) => {
      if (curr.id === Number(this.props.match.params.categoryId)) {
        accum = curr.name
      }
      return accum
    }, '')

    const items = this.props.singlecategoryitems
    return (
      <div className="items-view">
        <div className="filter-tab">
          <h3>{catName}</h3>
          <div className="filter-element">
            <p>Price:</p>
            <select
              htmlFor="pricesort"
              name="price"
              defaultValue="none"
              onChange={this.handleChange}
            >
              <option defaultValue="none" disabled selected>
                Select
              </option>
              <option value="ASC">Sort Low to High</option>
              <option value="DESC">Sort High To Low</option>
            </select>
          </div>

          <div className="filter-element">
            <button type="button">Apply</button>
          </div>
        </div>

        <div className="items-view flex-display all-item-body">
          <Advertisements />

          <div className="items-view">
            {items.length > 0 ? (
              items.map(item => {
                return (
                  <div className="single-item-in-view">
                    <ItemCard item={item} key={item.id} />
                  </div>
                )
              })
            ) : (
              <h1>No items in this category </h1>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    singlecategoryitems: state.singlecategoryitems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getItemsByCat: id => dispatch(fetchByCategoryThunk(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleCategory)
)
