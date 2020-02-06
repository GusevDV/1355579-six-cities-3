import React from "react";
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const Data = {
  OFFERS_COUNT: 6,
};

ReactDOM.render(
    <App offersCount={Data.OFFERS_COUNT} />,
    document.getElementById(`root`)
);
