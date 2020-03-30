import React from 'react';

const withToggle = (Component) => {
  class WithToggle extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isActive: false,
      };
      this.handleItemToggle = this.handleItemToggle.bind(this);
    }
    handleItemToggle() {
      this.setState((prevState) => ({
        isActive: !prevState.isActive
      }));
    }
    render() {
      return (
        <Component
          onToggle={this.handleItemToggle}
          isActive={this.state.isActive}
          {...this.props}
        >
        </Component>
      );
    }
  }

  WithToggle.propTypes = {};

  return WithToggle;
};

export default withToggle;
