import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateItemThunk, assignCategoryThunk} from '../store/singleitem'
import CategoryDropDown from './categorydropdown'

class UpdateItem extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAssign = this.handleAssign.bind(this)
    this.state = {
      name: '',
      price: '',
      stock: '',
      description: '',
      imageUrl: '',
      category: ''
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleAssign(evt) {
    evt.preventDefault()
    let obj = {}
    if (this.state.category) {
      obj.category = this.state.category
    }
    this.props.assign(Number(this.props.match.params.itemId), obj)
    obj = {}
    this.setState({
      name: '',
      price: '',
      stock: '',
      description: '',
      imageUrl: '',
      category: ''
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let obj = {}
    if (this.state.name) {
      obj.name = this.state.name
    }
    if (this.state.price) {
      obj.price = this.state.price
    }
    if (this.state.stock) {
      obj.inventory = this.state.stock
    }
    if (this.state.description) {
      obj.description = this.state.description
    }
    if (this.state.imageUrl) {
      obj.photo = this.state.imageUrl
    }
    this.props.update(Number(this.props.match.params.itemId), obj)
    obj = {}
    this.setState({
      name: '',
      price: '',
      stock: '',
      description: '',
      imageUrl: '',
      category: ''
    })
  }

  render() {
    return (
      <div>
        <h1>Assign Category</h1>
        <div>
          <form onSubmit={this.handleAssign}>
            <label htmlFor="category">Category:</label>
            <CategoryDropDown handleChange={this.handleChange} />
            <button
              type="submit"
              disabled={
                !this.state.category ||
                this.state.category === 'select category'
              }
            >
              Assign
            </button>
          </form>
        </div>

        <h1>Update Product</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Product Name:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <label htmlFor="price">Price:</label>
          <input
            value={this.state.price}
            name="price"
            type="text"
            onChange={this.handleChange}
          />

          <label htmlFor="stock">Stock:</label>
          <input
            name="stock"
            type="number"
            onChange={this.handleChange}
            value={this.state.stock}
          />

          <label htmlFor="description">Description:</label>
          <input
            name="description"
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
          />

          <label htmlFor="imageUrl">Image URL:</label>
          <input
            name="imageUrl"
            type="text"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (id, obj) => dispatch(updateItemThunk(id, obj)),
    assign: (itemId, catName) => dispatch(assignCategoryThunk(itemId, catName))
  }
}
export default withRouter(connect(null, mapDispatchToProps)(UpdateItem))
