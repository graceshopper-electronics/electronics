import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchReviews} from '../store/review'
import axios from 'axios'

const defaultState = {
  reviews: [],
  content: '',
  rating: ''
}

class Reviews extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addReview = this.addReview.bind(this)
  }

  async componentDidMount() {
    const res = await axios.get(`/api/reviews/${this.props.id}`)
    this.setState({reviews: res.data})
  }

  addReview(review) {
    review.user = {}
    review.user.email = this.props.user.email
    console.log(review)
    this.setState({
      content: '',
      rating: '',
      reviews: [...this.state.reviews, review]
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      const newReview = {
        content: this.state.content,
        rating: this.state.rating ? this.state.rating : 1,
        itemId: this.props.id
      }
      const res = await axios.post('/api/reviews/', newReview)
      this.addReview(res.data)
    } catch (err) {
      this.setState({
        error: `There was a problem posting review!: ${err.message}`
      })
    }
  }

  render() {
    if (!this.state.reviews.length) {
      return (
        <div>
          <h2>No Reviews Yet!</h2>
        </div>
      )
    }
    const average =
      this.state.reviews.reduce(function(acc, review) {
        return acc + Number(review.rating)
      }, 0) / this.state.reviews.length
    return (
      <div>
        <h3>Average Rating: {average.toFixed(2)} / 5 </h3>
        {this.state.reviews.map(review => (
          <div key={review.id}>
            <p>
              Review by {review.user.email} on{' '}
              {review.submissionDate.slice(0, 10)}
            </p>
            <h4>Rating: {review.rating} / 5</h4>
            <p>{review.content}</p>
          </div>
        ))}
        {this.props.user.id ? (
          <div>
            <h3> Leave a Review!</h3>
            <form onSubmit={this.handleSubmit}>
              <p>
                Rating (Out of Five):
                <select
                  className="form-control"
                  name="rating"
                  onChange={this.handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </p>
              <div>Write a Review:</div>
              <p>
                <input
                  type="text"
                  name="content"
                  id="reviewEntry"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </p>
              <button type="submit">Submit Review!</button>
            </form>
          </div>
        ) : (
          <div>
            <h3>Log in to Leave a Review!</h3>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews: id => dispatch(fetchReviews(id))
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews))
