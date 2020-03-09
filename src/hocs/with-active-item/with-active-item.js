import React from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        itemId: null
      };

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    handleMouseEnter(offerId) {
      this.setState({
        itemId: offerId
      });
    }
    handleMouseLeave() {
      this.setState({
        itemId: null
      });
    }
    render() {
      return (
        <Component
          {...this.props}
          activeItemId={this.state.itemId}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
        </Component>
      );
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
