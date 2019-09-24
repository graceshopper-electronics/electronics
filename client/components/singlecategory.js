import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ItemCard from './itemcard'

import {fetchByCategoryThunk} from '../store/singlecategoryitems'

class SingleCategory extends Component {
  componentDidMount() {
    this.props.getItemsByCat(this.props.match.params.categoryId)
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
      <div>
        <h3>{catName}</h3>
        <div>
          {items.length > 0 ? (
            items.map(item => <ItemCard item={item} key={item.id} />)
          ) : (
            <h1>No items in this category </h1>
          )}
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
