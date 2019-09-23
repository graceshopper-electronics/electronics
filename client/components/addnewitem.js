import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItemThunk} from '../store/items'

class AddNewItem extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: '',
      price: '',
      stock: '',
      description: '',
      imageUrl: ''
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
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
    if (this.state.description) {
      obj.description = this.state.description
    }
    if (this.state.stock) {
      obj.inventory = this.state.stock
    }
    if (this.state.imageUrl) {
      obj.photo = this.state.imageUrl
    }
    this.props.addItem(obj)
    this.setState({
      name: '',
      price: '',
      stock: '',
      description: '',
      imageUrl: ''
    })
    obj = {}
  }

  render() {
    return (
      <div>
        <h1>Add New Product</h1>
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
            name="stock"
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
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: obj => dispatch(addItemThunk(obj))
  }
}
export default connect(null, mapDispatchToProps)(AddNewItem)

// https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg
