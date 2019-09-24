import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ItemCard from './itemcard'

import {fetchByCategoryThunk} from '../store/singlecategory'

class SingleCategory extends Component {
  componentDidMount() {
    this.props.getItemsByCat(this.props.match.params.categoryId)
  }

  render() {
    const catName = this.props.categories.reduce((accumulator, curr) => {
      if (curr.id === Number(this.props.match.params.categoryId)) {
        accumulator = curr.name
      }
      return accumulator
    }, '')

    return (
      <div>
        <h3>{catName}</h3>
        {/* <div>
          {this.props.items.map(item => <ItemCard item={item} key={item.id} />)}
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    items: state.ctgItems
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
