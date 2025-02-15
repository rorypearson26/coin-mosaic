import GreyscaleBoundarySlider from "@/components/GreyscaleFromArray/GreyscaleBoundarySlider";
import { Image, Stack } from "@mantine/core";
import { FunctionComponent } from "react";

export interface GreyscaleImageManipulatorProps {
  inputImageUrl: string;
  levels?: number;
}

const GreyscaleImageManipulator: FunctionComponent<
  GreyscaleImageManipulatorProps
> = ({ inputImageUrl, levels = 3 }) => {
  return (
    <Stack h={300} align="stretch" justify="flex-start" gap="md">
      <Image src={inputImageUrl} />
      <GreyscaleBoundarySlider levels={levels} />
    </Stack>
  );
};

export default GreyscaleImageManipulator;
