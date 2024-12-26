import { RangeSlider } from "@mantine/core";
import { FunctionComponent, useState } from "react";

interface GreyscaleBoundarySliderProps {
  levels: number;
}

const DEFAULT_LOW = 100;
const DEFAULT_HIGH = 200;

const GreyscaleBoundarySlider: FunctionComponent<
  GreyscaleBoundarySliderProps
> = ({ levels }) => {
  console.log(`using ${levels} levels`);
  const [[low, high], setValue] = useState<[number, number]>([
    DEFAULT_LOW,
    DEFAULT_HIGH,
  ]);

  return (
    <div>
      <RangeSlider
        mt="xl"
        styles={{ thumb: { borderWidth: 2, padding: 3 } }}
        defaultValue={[DEFAULT_LOW, DEFAULT_HIGH]}
        thumbSize={20}
        min={0}
        max={255}
        onChange={setValue}
      />
      <h1>{low}</h1>
      <h1>{high}</h1>
    </div>
  );
};

export default GreyscaleBoundarySlider;
