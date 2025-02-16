import { useMutation } from "@tanstack/react-query";

export interface CreateSVGImageProps {
  intensityEnumArray: number[][];
}

const createSVGImage = async ({
  intensityEnumArray,
}: CreateSVGImageProps): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const svgCode = createSVGCircles(intensityEnumArray);
      const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgCode)}`;
      resolve(dataUrl);
    } catch (error) {
      reject(error);
    }
  });
};

function createSVGCircles(
  intensityEnumArray: number[][],
  circleRadius: number = 10
): string {
  const rgbArray = convertToRGB(intensityEnumArray);
  const rows = rgbArray.length;
  const cols = rgbArray[0].length;
  const svgWidth = cols * circleRadius * 2;
  const svgHeight = rows * circleRadius * 2;

  let svgString = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const rgb = rgbArray[row][col];
      const x = col * circleRadius * 2 + circleRadius;
      const y = row * circleRadius * 2 + circleRadius;

      svgString += `<circle cx="${x}" cy="${y}" r="${circleRadius}" fill="${rgb}" />`;
    }
  }

  svgString += `</svg>`;
  return svgString;
}

enum CoinColours {
  Dark = "rgb(60, 30, 2)",
  Mid = "rgb(129, 88, 0)",
  Light = "rgb(184, 146, 87)",
}

function convertToRGB(intensityEnumArray: number[][]): string[][] {
  const width = intensityEnumArray[0].length;
  const height = intensityEnumArray.length;
  const rgbArray: string[][] = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(""));

  for (let rowIndex: number = 0; rowIndex < height; rowIndex++) {
    for (let colIndex: number = 0; colIndex < width; colIndex++) {
      const currentEnumInt = intensityEnumArray[rowIndex][colIndex];
      rgbArray[rowIndex][colIndex] = Object.values(CoinColours)[currentEnumInt];
    }
  }
  return rgbArray;
}

export const useCoinMosaic = () =>
  useMutation({
    mutationFn: (input: CreateSVGImageProps) => {
      return createSVGImage(input);
    },
    mutationKey: ["downsizedImage"],
  });
