import { useMutation } from '@tanstack/react-query';

export interface CreateGreyscaleImageInput {
  inputImageUrl: string;
}

export interface CreateGreyscaleImageOutput {
  outputImageUrl: string;
  imgIntensityArray: number[][];
  aspectRatio: number;
}

const createGreyscaleImage = ({
  inputImageUrl,
}: CreateGreyscaleImageInput): Promise<CreateGreyscaleImageOutput> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = inputImageUrl;

    if (ctx === undefined || ctx === null) {
      throw Error("canvas not set up correctly");
    }

    img.onload = () => {
      const { width, height } = { width: img.width, height: img.height };
      const aspectRatio = width / height;
      canvas.width = width;
      canvas.height = height;
      const imgIntensityArray = new Array(height)
        .fill(0)
        .map(() => new Array(width).fill(0));

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4; // Calculate the index in the data array
          const intensity = rgbToGreyscale(data[i], data[i + 1], data[i + 2]);
          data[i] = intensity;
          data[i + 1] = intensity;
          data[i + 2] = intensity;
          imgIntensityArray[y][x] = intensity;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      const outputImageUrl = canvas.toDataURL();
      resolve({ outputImageUrl, imgIntensityArray, aspectRatio });
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};

function rgbToGreyscale(red: number, green: number, blue: number): number {
  const r = red * 0.3;
  const g = blue * 0.59;
  const b = green * 0.11;

  return r + g + b;
}

export const useGreyscaleImage = () =>
  useMutation({
    mutationFn: (input: CreateGreyscaleImageInput) => {
      return createGreyscaleImage(input);
    },
    mutationKey: ["greyscaleImage"],
  });
