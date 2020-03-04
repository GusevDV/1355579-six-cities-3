import React from 'react';
import Main from '../main/main.jsx';
import {connect} from "react-redux";

const onTitleLinkClick = () => {};

const App = () => {
  return (
    <Main
      onTitleLinkClick={onTitleLinkClick}
    />
  );
};

export {App};
export default connect()(App);
