import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateCategoryThunk} from '../store/categories'

class UpdateCategory extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: '',
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
    if (this.state.imageUrl) {
      obj.photo = this.state.imageUrl
    }
    let ctgId = this.props.id
    this.props.update(ctgId, obj)
    this.setState({
      name: '',
      imageUrl: ''
    })
    obj = {}
  }

  render() {
    return (
      <div>
        <h1>Update Category</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Category Name:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
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
    update: (id, obj) => dispatch(updateCategoryThunk(id, obj))
  }
}
export default withRouter(connect(null, mapDispatchToProps)(UpdateCategory))
