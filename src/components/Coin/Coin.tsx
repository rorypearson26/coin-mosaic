import { RGB } from "./useCoinColours";

export class Coin {
  massInGrams: number;
  diameter: number;
  lightRGB: RGB;
  midRGB: RGB;
  darkRGB: RGB;

  constructor(
    massInGrams: number,
    diameter: number,
    lightRGB: RGB,
    midRGB: RGB,
    darkRGB: RGB
  ) {
    this.massInGrams = massInGrams;
    this.diameter = diameter;
    this.lightRGB = lightRGB;
    this.midRGB = midRGB;
    this.darkRGB = darkRGB;
  }
}
