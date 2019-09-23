import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddToCart from './addToCart'
import axios from 'axios'
import {setSearchedItems} from '../store/items'

/**
 * COMPONENT
 */
import {withRouter} from 'react-router-dom'
import ItemCard from './itemcard'

let defaultState = {
  price: '',
  category: 0,
  perPage: 0,
  lowestResult: 0,
  highestResult: 0,
  offset: 0
}

class Allitems extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.pageClick = this.pageClick.bind(this)
  }

  pageClick(evt) {
    console.log(evt.target.value)
    let obj = {offset: evt.target.value}
    this.handleClick(obj)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleClick(evt) {
    let limit = !this.state.perPage ? 15 : Number(this.state.perPage)
    let offset = !evt.offset ? 0 : Number(Number(evt.offset) * limit)
    let whereConditions = ''
    if (this.state.category) {
      whereConditions += `&categoryid=${this.state.category}`
    }
    if (this.state.price) {
      whereConditions += `&price=${this.state.price}`
    }
    try {
      let result = await axios.get(
        `/api/items?limit=${limit}&offset=${offset}${whereConditions}`
      )
      this.props.getItems(result.data)
      this.setState({
        offset: evt.offset
      })
    } catch (err) {
      this.setState({
        error: `There was a problem filtering results!: ${err.message}`
      })
    }
  }

  render() {
    console.log(this.props.items)
    const items = this.props.items
    return (
      <div>
        <div className="mappedObject">
          <p>
            Sort By Price:
            <select
              className="form-control"
              name="price"
              defaultValue=""
              onChange={this.handleChange}
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="ASC">Sort Low to High</option>
              <option value="DESC">Sort High To Low</option>
              <option value="">Price Sort Off</option>
            </select>
            Filter By Categorey:
            <select
              className="form-control"
              name="category"
              defaultValue=""
              onChange={this.handleChange}
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="">All</option>
              <option value="1">TV</option>
              <option value="2">Mobile Phones</option>
              <option value="3">Audio</option>
              <option value="4">Photography</option>
            </select>
            Results Per Page:
            <select
              className="form-control"
              name="perPage"
              defaultValue=""
              onChange={this.handleChange}
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
            <button type="button" onClick={this.handleClick}>
              Submit Filters
            </button>
          </p>
        </div>
        {items.length ? (
          <div>
            <h3>All Products View</h3>
            <div>
              {items.map(item => {
                return (
                  <div key={item.id}>
                    <ItemCard item={item} />
                    {item.inventory ? (
                      <AddToCart item={item} />
                    ) : (
                      <h3>Out of Stock, Check Back Later</h3>
                    )}
                  </div>
                )
              })}
              {this.state.offset ? (
                <div>
                  <button
                    type="button"
                    value={Number(this.state.offset) - 1}
                    onClick={this.pageClick}
                  >
                    Previous Page
                  </button>{' '}
                  <button
                    type="button"
                    value={Number(this.state.offset) + 1}
                    onClick={this.pageClick}
                  >
                    Next Page
                  </button>
                  <p> </p>
                  <br />
                </div>
              ) : (
                <div>
                  {' '}
                  <button
                    type="button"
                    value={Number(this.state.offset) + 1}
                    onClick={this.pageClick}
                  >
                    Next Page
                  </button>
                  <p> </p>
                  <br />
                </div>
              )}
            </div>
          </div>
        ) : (
          <h2>No Items Matches</h2>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: items => dispatch(setSearchedItems(items))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Allitems))
