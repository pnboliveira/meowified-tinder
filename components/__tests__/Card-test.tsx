import * as React from "react";
import renderer from "react-test-renderer";

import Card from "@/components/Card/Card";

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Card
        name="John Doe"
        bio="I am a bio"
        image="https://example.com/image.png"
        adaptability={7}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
