import { Center, Container, Grid, Image, Slider, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Dimensions } from "./InputForm";

interface Props {
  croppedImageUrl: string;
  aspectRatio: number;
  setDimensions: (dimensions: Dimensions) => void;
}

const DEFAUlT_WIDTH_IN_CM = 100;

const CropPreview: React.FC<Props> = ({
  croppedImageUrl,
  aspectRatio,
  setDimensions,
}) => {
  const [mosaicWidth, setMosaicWidth] = useState(DEFAUlT_WIDTH_IN_CM);
  const [mosaicHeight, setMosaicHeight] = useState(DEFAUlT_WIDTH_IN_CM);

  useEffect(() => {
    setMosaicHeight(Math.round(mosaicWidth / aspectRatio));
    setDimensions({ width: mosaicWidth, height: mosaicHeight });
  }, [aspectRatio, mosaicWidth, mosaicHeight, setMosaicHeight, setDimensions]);

  return (
    <Container>
      <Grid>
        <Grid.Col span={11}>
          <Center>
            <Text size="xl" fw={800}>
              {`${mosaicWidth}cm`}
            </Text>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={11}>
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
        </Grid.Col>
      </Grid>
      <Grid justify="center" align="center">
        <Grid.Col span={11}>
          <Image alt="cropped" src={croppedImageUrl} />
        </Grid.Col>
        <Grid.Col span={1}>
          <Text size="xl" fw={800}>
            {`${mosaicHeight}cm`}
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CropPreview;
