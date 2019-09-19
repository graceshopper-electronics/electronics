import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchReviews} from '../store/review'
import axios from 'axios'

class Reviews extends Component {
  constructor() {
    super()
    this.state = {
      reviews: []
    }
  }

  async componentDidMount() {
    const res = await axios.get(`/api/items/${this.props.id}`)
    this.setState({reviews: res.data})
  }

  render() {
    return (
      <div>
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
    reviews: state.reviews
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews))
