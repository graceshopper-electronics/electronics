import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ItemCard from './itemcard'
import axios from 'axios'

let defaultState = {
  items: [],
  catName: ''
}

class SingleCategory extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  async componentDidMount() {
    const res = await axios.get(
      `/api/categories/${this.props.match.params.categoryId}`
    )
    this.setState({
      items: res.data,
      catName: res.data[0].category.name
    })
  }

  render() {
    let category = Number(this.props.match.params.categoryId)
    let allItems = this.state.items
    let catItems = allItems.reduce((accumulator, curr) => {
      if (curr.categoryId === category) {
        accumulator.push(curr)
      }
      return accumulator
    }, [])

    return (
      <div>
        <h3>{this.state.catName}</h3>
        <div>
          {catItems.map(item => <ItemCard item={item} key={item.id} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(SingleCategory))
