import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withReviewForm = (Component) => {
  class WithReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleInputChangeRating = this.handleInputChangeRating.bind(this);
      this.handleInputChangeComment = this.handleInputChangeComment.bind(this);
      this.checkValid = this.checkValid.bind(this);
    }

    handleInputChangeRating(event, value) {
      this.setState({rating: value});
    }

    handleInputChangeComment(event) {
      this.setState({comment: event.target.value});
    }

    handleFormSubmit(e) {
      e.preventDefault();
      this.props.onSubmit({
        rating: this.state.rating,
        comment: this.state.comment,
      });
      this.setState({
        rating: 0,
        comment: ``
      });
    }

    checkValid() {
      const {comment, rating} = this.state;
      return comment.length >= 50 && comment.length <= 300 && rating !== 0;
    }

    render() {
      return (
        <Component
          {...this.props}
          onFormSubmit={this.handleFormSubmit}
          comment={this.state.comment}
          isActive={this.checkValid()}
          rating={this.state.rating}
          onChangeRating={this.handleInputChangeRating}
          onChangeComment={this.handleInputChangeComment}
        />
      );
    }
  }

  WithReviewForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  return WithReviewForm;
};

export default withReviewForm;
