import React from 'react';

const withActiveItemMouse = (Component) => {
  class WithActiveItemMouse extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        itemId: null
      };

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    handleMouseEnter(offerId) {
      if (this.state.offerId !== offerId) {
        this.setState({
          itemId: offerId
        });
      }
    }
    handleMouseLeave() {
      if (this.state.offerId !== null) {
        this.setState({
          itemId: null
        });
      }
    }
    render() {
      return (
        <Component
          activeItemId={this.state.itemId}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          {...this.props}
        >
        </Component>
      );
    }
  }

  WithActiveItemMouse.propTypes = {};

  return WithActiveItemMouse;
};

export default withActiveItemMouse;
