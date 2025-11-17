import { GBP_ONE_PENNY } from "@/components/Coin/CoinTypes";
import { useCoinColours } from "@/components/Coin/useCoinColours";
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

function createSVGCircles(intensityEnumArray: number[][]): string {
  const coin = GBP_ONE_PENNY;
  const coinRadius = coin.diameter / 2;
  const rgbArray = useCoinColours(coin, intensityEnumArray);
  const rows = rgbArray.length;
  const cols = rgbArray[0].length;
  const svgWidth = cols * coin.diameter;
  const svgHeight = rows * coin.diameter;

  let svgString = `<svg width="${svgWidth}" height="${svgHeight}" style="background-color:black" xmlns="http://www.w3.org/2000/svg">`;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const rgb = rgbArray[row][col];
      const x = col * coin.diameter + coinRadius;
      const y = row * coin.diameter + coinRadius;

      svgString += `<circle cx="${x}" cy="${y}" r="${coinRadius}" fill="${rgb}" />`;
    }
  }

  svgString += `</svg>`;
  return svgString;
}

export const useCoinMosaic = () =>
  useMutation({
    mutationFn: (input: CreateSVGImageProps) => {
      return createSVGImage(input);
    },
    mutationKey: ["downsizedImage"],
  });
