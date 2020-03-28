import React from 'react';
import PropTypes from 'prop-types';

const withActiveItemClick = (Component) => {
  class WithActiveItemClick extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: 0
      };

      this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(item) {
      if (this.state.activeItem !== item) {
        if (typeof this.props.onChangeItem === `function`) {
          this.props.onChangeItem(item);
        }
        this.setState({
          activeItem: item
        });
      }
    }
    render() {
      return (
        <Component
          activeItem={this.state.activeItem}
          onItemClick={this.handleItemClick}
          {...this.props}
        >
        </Component>
      );
    }
  }

  WithActiveItemClick.propTypes = {
    onChangeItem: PropTypes.func
  };

  return WithActiveItemClick;
};

export default withActiveItemClick;
