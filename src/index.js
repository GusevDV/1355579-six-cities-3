import React from "react";
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const Data = {
  Offers: [
    `Beautiful & luxurious apartment at great location`,
    `Wood and stone place`,
    `Nice, cozy, warm big bed apartment`,
    `Canal View Prinsengracht`,
    `Beautiful & luxurious apartment at great location`,
    `Nice, cozy, warm big bed apartment`,
  ]
};

ReactDOM.render(
    <App offers={Data.Offers} />,
    document.getElementById(`root`)
);
