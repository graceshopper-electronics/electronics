import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ItemCard from './itemcard'
import Advertisements from './advertisements'

import {
  fetchByCategoryThunk,
  sortAscThunk,
  sortDescThunk
} from '../store/singlecategoryitems'

class SingleCategory extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {}
  }

  componentDidMount() {
    this.props.getItemsByCat(this.props.match.params.categoryId)
  }

  handleChange(evt) {
    if (evt.target.value === 'ASC') {
      this.props.sortAsc(this.props.singlecategoryitems)
      this.setState({})
    } else if (evt.target.value === 'DESC') {
      this.props.sortDesc(this.props.singlecategoryitems)
      this.setState({})
    } else {
      this.props.getItemsByCat(this.props.match.params.categoryId)
      this.setState({})
    }
  }

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
    getItemsByCat: id => dispatch(fetchByCategoryThunk(id)),
    sortAsc: items => dispatch(sortAscThunk(items)),
    sortDesc: items => dispatch(sortDescThunk(items))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleCategory)
)
