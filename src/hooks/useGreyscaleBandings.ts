import { useCallback, useEffect, useMemo, useState } from "react";

export interface IntensityLevels {
  lower: number;
  upper: number;
}

export interface GreyscaleBandings {
  rowCount: number;
  columnCount: number;
  processedArray: number[][];
  setNewIntensityLevels: (value: IntensityLevels) => void;
  setInputPixelArray: (arr: number[][]) => void;
}

export default function useGreyscaleBandings(
  intensityLevels: IntensityLevels,
  originalPixelArray: number[][]
): GreyscaleBandings {
  const [newIntensityLevels, setNewIntensityLevels] = useState(intensityLevels);
  const [inputPixelArray, setInputPixelArray] = useState(originalPixelArray);
  const rowCount = useMemo(() => inputPixelArray.length, [inputPixelArray]);
  const columnCount = useMemo(
    () => inputPixelArray[0].length,
    [inputPixelArray]
  );
  const emptyArray = useCallback(() => {
    return new Array(rowCount)
      .fill(0)
      .map(() => new Array(columnCount).fill(0));
  }, [rowCount, columnCount]);

  const [processedArray, setProcessedArray] =
    useState<number[][]>(emptyArray());

  useEffect(() => {
    const nextArray = emptyArray();
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        const intensity = inputPixelArray[rowIndex][columnIndex];
        nextArray[rowIndex][columnIndex] = processPixel(intensity);
      }
    }
    setProcessedArray(nextArray);
  }, [inputPixelArray, newIntensityLevels]);

  function processPixel(pixelIntensity: number): number {
    if (pixelIntensity >= newIntensityLevels.upper) {
      return 2;
    } else if (pixelIntensity >= newIntensityLevels.lower) {
      return 1;
    }
    return 0;
  }

  return {
    rowCount,
    columnCount,
    processedArray,
    setNewIntensityLevels,
    setInputPixelArray,
  };
}
