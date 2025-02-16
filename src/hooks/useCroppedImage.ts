import { useEffect, useState } from "react";
import { Crop } from "react-image-crop";

function useCroppedImage(imgSrc: string | undefined, crop: Crop | undefined) {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!imgSrc || !crop) {
      setCroppedImage(null);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const image = new window.Image();
    image.onload = () => {
      const leftX = image.width * crop.x * 0.01;
      const cropWidth = image.width * crop.width * 0.01;
      const upperY = image.height * crop.y * 0.01;
      const cropHeight = image.height * crop.height * 0.01;

      canvas.height = cropHeight;
      canvas.width = cropWidth;

      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        image,
        leftX,
        upperY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const baseOutput = canvas.toDataURL("image/jpeg");
      setCroppedImage(baseOutput);
    };

    image.src = imgSrc!;
    image.onerror = () => {
      setCroppedImage(null); // Or some default image
    };
  }, [crop, imgSrc]);

  return { croppedImage };
}

export default useCroppedImage;
