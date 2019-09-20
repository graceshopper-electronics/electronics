import React, {Component} from 'react'
import {connect} from 'react-redux'

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
    if (this.state.fuelType) {
      obj.fuelType = this.state.fuelType
    }
    if (this.state.fuelLevel) {
      obj.fuelLevel = this.state.fuelLevel
    }
    if (this.state.imageUrl) {
      obj.imageUrl = this.state.imageUrl
    }
    this.props.update(this.props.params.robotId, obj)
    this.setState({
      name: '',
      fuelType: '',
      fuelLevel: '',
      imageUrl: ''
    })
    obj = {}
    this.props.fetchSingleRobot(this.props.params.robotId)
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
            type="number"
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

// const mapDispatchToProps = dispatch => {
//   return {
//     update: (id, obj) => dispatch(updateRobotThunk(id, obj))
//   }
// }
// export default connect(null, mapDispatchToProps)(UpdateRobot)
export default AddNewItem
