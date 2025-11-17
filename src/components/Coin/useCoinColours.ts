import { Coin } from "./Coin";

export function useCoinColours(
  coinType: Coin,
  intensityEnumArray: number[][]
): string[][] {
  const width = intensityEnumArray[0].length;
  const height = intensityEnumArray.length;
  const rgbArray: string[][] = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(""));

  const coinColours = [coinType.darkRGB, coinType.midRGB, coinType.lightRGB];
  console.log(intensityEnumArray);
  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    for (let colIndex = 0; colIndex < width; colIndex++) {
      const currentEnumInt = intensityEnumArray[rowIndex][colIndex];
      const colour = coinColours[currentEnumInt];
      rgbArray[rowIndex][colIndex] = colour.getRandomisedRGBString();
    }
  }
  return rgbArray;
}

export class RGB {
  #red: number;
  #green: number;
  #blue: number;

  constructor(red: number, green: number, blue: number) {
    this.#red = red;
    this.#green = green;
    this.#blue = blue;
  }

  getRandomisedRGBString(): string {
    const red = this.#getRandomisedIntensity(this.#red);
    const green = this.#getRandomisedIntensity(this.#green);
    const blue = this.#getRandomisedIntensity(this.#blue);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  #getRandomisedIntensity(initialIntensity: number) {
    const variance = 15;
    const lowerBound = Math.max(initialIntensity - variance, 0);
    const upperBound = Math.min(initialIntensity + variance, 255);
    return (
      Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound
    );
  }
}
