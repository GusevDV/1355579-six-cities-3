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

const getPrice = () => Math.floor(Math.random() * (500 - 100) + 100);

ReactDOM.render(
    <App offers={Data.Offers} getPrice={getPrice} />,
    document.getElementById(`root`)
);
