import { Dimensions } from "@/features/InputForm/InputForm";
import { useMutation } from "@tanstack/react-query";

export interface CreateDownsizedImage {
  inputImageUrl: string;
  dimensions: Dimensions;
}

const createDownsizedImage = async ({
  inputImageUrl,
  dimensions,
}: CreateDownsizedImage): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new window.Image();
  image.src = inputImageUrl!;

  canvas.width = image.width;
  canvas.height = image.height;

  if (!ctx) {
    throw new Error("No 2d context");
  }

  ctx.drawImage(image, 0, 0);

  const pixelsWhenOnePixelIs5mm = dimensions.height * dimensions.width * 4;
  const pixelsInCroppedImage = image.height * image.width;
  const scaleFactor = pixelsWhenOnePixelIs5mm / pixelsInCroppedImage;
  canvas.width *= scaleFactor;
  canvas.height *= scaleFactor;

  // Draw the scaled image back onto itself
  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Failed to convert canvas to Blob"));
      }
    }, "image/png");
  });
};

export const useImageScaling = () =>
  useMutation({
    mutationFn: (input: CreateDownsizedImage) => {
      return createDownsizedImage(input);
    },
    mutationKey: ["downsizedImage"],
  });
