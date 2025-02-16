import { Dimensions } from '@/pages/Home.page';
import { useMutation } from '@tanstack/react-query';

export interface CreateDownsizedImage {
  inputImageUrl: string;
  dimensions: Dimensions;
}

export interface ImageScalingOutput {
  outputImageUrl: string;
  imgIntensityArray: number[][];
}

const COIN_SIZE_CM = 2.3;

const createDownsizedImage = async ({
  inputImageUrl,
  dimensions,
}: CreateDownsizedImage): Promise<ImageScalingOutput> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.src = inputImageUrl!;

    canvas.width = img.width;
    canvas.height = img.height;

    if (!ctx || canvas.width === 0) {
      throw new Error("No 2d context");
    }

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      console.log(dimensions);

      const coinsInWidth = dimensions.height / COIN_SIZE_CM;
      const scaleFactor = coinsInWidth / img.width;
      const outputWidth = Math.floor(canvas.width * scaleFactor);
      const outputHeight = Math.floor(canvas.height * scaleFactor);
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      console.log(`height ${outputHeight}`);
      console.log(`width ${outputWidth}`);
      const imgIntensityArray = new Array(outputHeight)
        .fill(0)
        .map(() => new Array(outputWidth).fill(0));

      // Draw the scaled image back onto itself
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        outputWidth,
        outputHeight
      );

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < outputHeight; y++) {
        for (let x = 0; x < outputWidth; x++) {
          const i = (y * outputWidth + x) * 4; // Calculate the index in the data array
          imgIntensityArray[y][x] = data[i];
        }
      }

      const outputImageUrl = canvas.toDataURL();
      resolve({ outputImageUrl, imgIntensityArray });
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};

export const useImageScaling = () =>
  useMutation({
    mutationFn: (input: CreateDownsizedImage) => {
      return createDownsizedImage(input);
    },
    mutationKey: ["downsizedImage"],
  });
