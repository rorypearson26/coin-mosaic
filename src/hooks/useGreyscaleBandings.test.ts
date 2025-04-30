import { renderHook } from "@testing-library/react";
import useGreyscaleBandings, { IntensityLevels } from "./useGreyscaleBandings";

describe("useGreyscaleBandings: dimensions are correct", () => {
  const inputArray = [
    [4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4],
  ];
  const greyscaleBindings: IntensityLevels = {
    lower: 10,
    upper: 100,
  };
  it("correct row count", () => {
    const { result } = renderHook(() =>
      useGreyscaleBandings(greyscaleBindings, inputArray)
    );
    expect(result.current.rowCount).toBe(3);
  });
  it("correct column count", () => {
    const { result } = renderHook(() =>
      useGreyscaleBandings(greyscaleBindings, inputArray)
    );
    expect(result.current.columnCount).toBe(5);
  });
});

describe("useGreyscaleBandings: array updates correctly", () => {
  it.each([
    [{ lower: 50, upper: 255 }, [254, 255, 5], [1, 2, 0]],
    [{ lower: 50, upper: 255 }, [49, 50, 51], [0, 1, 1]],
    [{ lower: 50, upper: 51 }, [49, 50, 51], [0, 1, 2]],
    [
      { lower: 105, upper: 110 },
      [100, 104, 105, 109, 110, 111],
      [0, 0, 1, 1, 2, 2],
    ],
  ])(
    `processes limits %s correctly and input of %s`,
    (limits, inputArray, expectedArray) => {
      const { result } = renderHook(() =>
        useGreyscaleBandings(limits, [inputArray])
      );

      expect(result.current.processedArray).toEqual([expectedArray]);
    }
  );
  it("updates a 2d array correctly", () => {
    const inputArray = [
      [100, 104, 120, 160, 110, 111],
      [0, 49, 50, 51, 255, 255],
      [49, 120, 119, 121, 255, 240],
    ];
    const expectedArray = [
      [1, 1, 2, 2, 1, 1],
      [0, 0, 1, 1, 2, 2],
      [0, 2, 1, 2, 2, 2],
    ];
    const { result } = renderHook(() =>
      useGreyscaleBandings({ lower: 50, upper: 120 }, inputArray)
    );

    expect(result.current.processedArray).toEqual(expectedArray);
  });
  it("updates when limits change", () => {
    const originalLimits = { lower: 40, upper: 120 };
    const newLimits = { lower: 25, upper: 225 };
    const inputArray = [[20, 150, 200]];
    const result = renderHook(() =>
      useGreyscaleBandings(originalLimits, inputArray)
    );

    expect(result.result.current.processedArray).toEqual([[0, 2, 2]]);
    result.result.current.setNewIntensityLevels(newLimits);
    result.rerender();
    expect(result.result.current.processedArray).toEqual([[0, 1, 1]]);
  });
});
