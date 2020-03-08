import React from 'react';

const withPlaceCardList = (Component) => {
  class WithPlaceCardList extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeCardId: null
      };

      this.handleCardHover = this.handleCardHover.bind(this);
      this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
    }
    handleCardHover(offerId) {
      this.setState({
        activeCardId: offerId
      });
    }
    handleCardMouseLeave() {
      this.setState({
        activeCardId: null
      });
    }
    render() {
      return (
        <Component
          {...this.props}
          activeCardId={this.state.activeCardId}
          onCardHover={this.handleCardHover}
          onCardMouseLeave={this.handleCardMouseLeave}
        >
        </Component>
      );
    }
  }

  WithPlaceCardList.propTypes = {};

  return WithPlaceCardList;
};

export default withPlaceCardList;
