import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from 'react-router-dom';
import Footer from "./footer.jsx";

it(`Should Footer component render correctly`, () => {

  const render = renderer.create(
      <BrowserRouter>
        <Footer/>
      </BrowserRouter>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});

