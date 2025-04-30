import { FunctionComponent, useEffect, useState } from 'react';

import GreyscaleBoundarySlider from '@/components/GreyscaleFromArray/GreyscaleBoundarySlider';
import useGreyscaleBandings from '@/hooks/useGreyscaleBandings';
import { CreateGreyscaleImageOutput } from '@/hooks/useGreyscaleImage';
import { useImageScaling } from '@/hooks/useImageScaling';
import { Button, Center, Image, Slider, Stack, Text } from '@mantine/core';

export interface GreyscaleImageManipulatorProps {
  greyData: CreateGreyscaleImageOutput;
  setCoinMosaicInputArray: (d: number[][]) => void;
}
const DEFAULT_LOW = 100;
const DEFAULT_HIGH = 200;
const DEFAUlT_WIDTH_IN_CM = 250;

const GreyscaleImageManipulator: FunctionComponent<
  GreyscaleImageManipulatorProps
> = ({
  greyData: { imgIntensityArray, aspectRatio, outputImageUrl },
  setCoinMosaicInputArray,
}) => {
  const [imageUrl, setImageUrl] = useState(outputImageUrl);
  const [[lower, upper], setValue] = useState<[number, number]>([
    DEFAULT_LOW,
    DEFAULT_HIGH,
  ]);

  const { processedArray, setNewIntensityLevels, setInputPixelArray } =
    useGreyscaleBandings({ lower, upper }, imgIntensityArray);

  const {
    mutate: scaleMutate,
    isPending: isScalingPending,
    data: scalingData,
  } = useImageScaling();

  const [mosaicWidth, setMosaicWidth] = useState(DEFAUlT_WIDTH_IN_CM);
  const [mosaicHeight, setMosaicHeight] = useState(DEFAUlT_WIDTH_IN_CM);

  useEffect(() => {
    setMosaicHeight(Math.round(mosaicWidth / aspectRatio));
    scaleMutate({
      inputImageUrl: outputImageUrl,
      dimensions: { width: mosaicWidth, height: mosaicHeight },
    });
  }, [aspectRatio, mosaicWidth, mosaicHeight, setMosaicHeight, scaleMutate]);

  useEffect(() => {
    setNewIntensityLevels({ lower, upper });
  }, [lower, upper, setNewIntensityLevels]);

  useEffect(() => {
    if (!isScalingPending && scalingData?.imgIntensityArray !== undefined) {
      setInputPixelArray(scalingData.imgIntensityArray);
    }
  }, [scalingData, isScalingPending, setInputPixelArray]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = processedArray[0].length;
    const height = processedArray.length;

    canvas.width = width;
    canvas.height = height;

    const imageData = ctx!.createImageData(width, height);
    const intensity = [70, 100, 200];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const greyscaleValue = processedArray[y][x];
        const indexPosition = Math.max(0, Math.min(255, greyscaleValue));
        const index = (y * width + x) * 4; // Calculate the index in the data array
        const clampedValue = intensity[indexPosition];
        imageData.data[index] = clampedValue; // Red channel
        imageData.data[index + 1] = clampedValue; // Green channel
        imageData.data[index + 2] = clampedValue; // Blue channel
        imageData.data[index + 3] = 255; // Alpha channel (fully opaque)
      }
    }
    ctx!.putImageData(imageData, 0, 0); // Draw the image data onto the canvas
    const dataURL = canvas.toDataURL("image/png");
    setImageUrl(dataURL);
  }, [processedArray, setImageUrl]);

  return (
    <Stack>
      <Center>
        <Text size="md" fw={800}>
          {`Height: ${mosaicWidth}cm x Width: ${mosaicHeight}cm`}
        </Text>
      </Center>
      <Slider
        p="md"
        mb="lg"
        value={mosaicWidth}
        onChange={setMosaicWidth}
        color="blue"
        size="xl"
        min={50}
        max={500}
        marks={[
          { value: 100, label: "100cm" },
          { value: 200, label: "200cm" },
          { value: 300, label: "300cm" },
          { value: 400, label: "400cm" },
        ]}
      />
      <Image alt="cropped" src={imageUrl} />
      <GreyscaleBoundarySlider setValue={setValue} />
      <Button onClick={() => setCoinMosaicInputArray(processedArray)}>
        Get Coin Mosaic
      </Button>
    </Stack>
  );
};

export default GreyscaleImageManipulator;
