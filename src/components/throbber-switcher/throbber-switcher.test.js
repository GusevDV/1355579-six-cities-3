import React from "react";
import renderer from "react-test-renderer";
import ThrobberSwitcher from "./throbber-switcher.jsx";

it(`Should Throbber component render`, () => {

  const render = renderer.create(
      <ThrobberSwitcher isLoading={true} render={()=>(
        <div>Test</div>
      )} />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});

it(`Should loaded render`, () => {

  const render = renderer.create(
      <ThrobberSwitcher isLoading={false} render={()=>(
        <div>Loaded</div>
      )}/>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
