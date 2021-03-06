import { createLayers, crossings } from "../utils";

import { twolayerOpt } from "../../../src";

test("twolayerOpt() works for very simple case", () => {
  // independent links that need to be swapped
  const [topLayer, bottomLayer] = createLayers([[[1], [0]]]);
  twolayerOpt()(topLayer, bottomLayer);
  const ids = bottomLayer.map((n) => n.id);
  expect(ids).toEqual(["1,1", "1,0"]);
});

test("twolayerOpt() works for debug", () => {
  const [topLayer, bottomLayer] = createLayers([[[1], [0]]]);
  const twolayer = twolayerOpt().debug(true);
  expect(twolayer.debug()).toBeTruthy();
  twolayer(topLayer, bottomLayer);
  const ids = bottomLayer.map((n) => n.id);
  expect(ids).toEqual(["1,1", "1,0"]);
});

test("twolayerOpt() works where mean fails", () => {
  const [topLayer, bottomLayer] = createLayers([
    [[4], [4], [0], [1], [2], [3], [4]]
  ]);
  bottomLayer.reverse();
  twolayerOpt()(topLayer, bottomLayer);
  expect(crossings([topLayer, bottomLayer])).toBeCloseTo(4);
  const ids = bottomLayer.map((n) => n.id);
  expect(ids).toEqual(["1,4", "1,0", "1,1", "1,2", "1,3"]);
});

test("twolayerOpt() works where median is suboptimal", () => {
  const [topLayer, bottomLayer] = createLayers([
    [[3], [2], [2], [0], [1], [3], [2]]
  ]);
  twolayerOpt()(topLayer, bottomLayer);
  expect(crossings([topLayer, bottomLayer])).toBeCloseTo(6);
  const ids = bottomLayer.map((n) => n.id);
  expect(ids).toEqual(["1,3", "1,2", "1,0", "1,1"]);
});

test("twolayerOpt() fails passing an arg to constructor", () => {
  const willFail = (twolayerOpt as unknown) as (x: null) => void;
  expect(() => willFail(null)).toThrow("got arguments to opt");
});
