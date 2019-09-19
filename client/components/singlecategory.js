import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ItemCard from './itemcard'

class SingleCategory extends Component {
  render() {
    let category = Number(this.props.match.params.categoryId)
    let allItems = this.props.items
    //using route id to find category name
    let catName = this.props.categories.filter(cat => {
      if (cat.id === category) {
        return cat
      }
    })[0].name
    //using reducer to return only the items for that category
    let catItems = allItems.reduce((accumulator, curr) => {
      if (curr.categoryId === category) {
        accumulator.push(curr)
      }
      return accumulator
    }, [])

    return (
      <div>
        <h3>{catName}</h3>
        <div>
          {catItems.map(item => <ItemCard item={item} key={item.id} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(SingleCategory))
