import { useState, useCallback, useEffect } from "react";

export interface IntensityLevels {
  lower: number;
  upper: number;
}

export interface GreyscaleBandings {
  rowCount: number;
  columnCount: number;
  processedArray: number[][];
  setIntensityLevels: (value: IntensityLevels) => void;
}

export default function useGreyscaleBandings(
  intensityLevels: IntensityLevels,
  originalPixelArray: number[][]
): GreyscaleBandings {
  const [newIntensityLevels, setNewIntensityLevels] = useState(intensityLevels);
  const rowCount = originalPixelArray.length;
  const columnCount = originalPixelArray[0].length;

  const processedArray: number[][] = new Array(rowCount)
    .fill(0)
    .map(() => new Array(columnCount).fill(0));

  const setIntensityLevels = useCallback((newValue: IntensityLevels) => {
    setNewIntensityLevels(newValue);
  }, []);

  useEffect(() => {
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        const intensity = originalPixelArray[rowIndex][columnIndex];
        processedArray[rowIndex][columnIndex] = processPixel(intensity);
      }
    }
  }, [originalPixelArray, newIntensityLevels]);

  function processPixel(pixelIntensity: number): number {
    if (pixelIntensity >= newIntensityLevels.upper) {
      return 2;
    } else if (pixelIntensity >= newIntensityLevels.lower) {
      return 1;
    }
    return 0;
  }

  return { rowCount, columnCount, processedArray, setIntensityLevels };
}
