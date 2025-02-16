import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { RangeSlider } from '@mantine/core';

interface GreyscaleBoundarySliderProps {
  setValue: Dispatch<SetStateAction<[number, number]>>;
}

const GreyscaleBoundarySlider: FunctionComponent<
  GreyscaleBoundarySliderProps
> = ({ setValue }) => {
  return (
    <div>
      <RangeSlider
        mt="xl"
        styles={{ thumb: { borderWidth: 1, padding: 3 } }}
        defaultValue={[10, 50]}
        thumbSize={20}
        min={0}
        max={255}
        onChange={setValue}
      />
    </div>
  );
};

export default GreyscaleBoundarySlider;
