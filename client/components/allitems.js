import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddToCart from './addToCart'
import axios from 'axios'
import {setSearchedItems} from '../store/items'
import AddNewItem from './addnewitem'
import {deleteItemThunk} from '../store/items'

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
    this.handleRemove = this.handleRemove.bind(this)
  }

  pageClick(evt) {
    if (evt.target.value === 'NaN') {
      evt.target.value = 1
    }
    let obj = {offset: evt.target.value}
    this.handleClick(obj)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleRemove = evt => {
    evt.preventDefault()
    if (evt.target.id) {
      this.props.deleteItem(evt.target.id)
    }
  }

  async handleClick(evt) {
    console.log(this.props.search, typeof this.props.search)
    let limit = !this.state.perPage ? 15 : Number(this.state.perPage)
    let offset = !evt.offset ? 0 : Number(Number(evt.offset) * limit)
    let whereConditions = ''
    if (this.props.search) {
      whereConditions += `&search=${this.props.search}`
    }
    if (this.state.category) {
      whereConditions += `&categoryid=${this.state.category}`
    }
    if (this.state.price) {
      whereConditions += `&price=${this.state.price}`
    }
    console.log(whereConditions)
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
    console.log(this.state.offset)
    const items = this.props.items
    const isAdmin = this.props.isAdmin
    return (
      <div>
        <div className="mappedObject flex-wrap">
          <div className="filter-tab">
            <div className="filter-element">
              <p>Price:</p>
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
            </div>

            <div className="filter-element">
              <p>Category:</p>
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
            </div>

            <div className="filter-element">
              <p>Results Per Page:</p>
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
            </div>

            <div className="filter-element">
              <button type="button" onClick={this.handleClick}>
                Apply
              </button>
            </div>
          </div>

          <div className="flex-display all-item-body">
            <div className="ads">
              <img src="/macbook-pro-new-ad.jpg" />
              <img src="/surface-ad.png" />
              <img src="/macbook-ad.jpg" />
              <img src="/dell-xp-ad.png" />
              <img src="/surface-family-ad.png" />
              <img src="/razer-blade-ad.png" />
              <img src="/surface-pro4-ad.jpg" />
              <img src="/lenovo-thinkpad-ad.jpg" />
              <img src="/macbook-pro-ad.jpg" />
            </div>

            {items.length ? (
              <div>
                <p>
                  {this.props.search
                    ? `Search result for ${this.props.search}`
                    : ''}
                </p>
                <div className="items-view">
                  {items.map(item => {
                    return (
                      <div key={item.id} className="single-item-in-view">
                        <ItemCard item={item} />
                        {isAdmin ? (
                          <div>
                            <button
                              type="button"
                              id={item.id}
                              onClick={evt => this.handleRemove(evt)}
                            >
                              Delete Item
                            </button>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>
                    )
                  })}
                  {Number(this.state.offset) ? (
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    search: state.search,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: items => dispatch(setSearchedItems(items)),
    deleteItem: id => dispatch(deleteItemThunk(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Allitems))
