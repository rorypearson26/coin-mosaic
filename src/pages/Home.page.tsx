import { useEffect, useMemo, useState } from "react";

import { ColourSchemeToggle } from "@/components/ColorSchemeToggle/ColourSchemeToggle";
import GreyscaleImageManipulator from "@/features/ImageManipulationPage/GreyscaleImageManipulator";
import UploadModal from "@/features/UploadModal/UploadModal";
import { useCoinMosaic } from "@/hooks/useCoinMosaic";
import { useGreyscaleImage } from "@/hooks/useGreyscaleImage";
import {
  Center,
  Container,
  Grid,
  Image,
  MantineProvider,
  Stack,
  Title,
} from "@mantine/core";

export interface Dimensions {
  width: number;
  height: number;
}

export function HomePage() {
  const { mutate: mutateGreyscale, data: greyData } = useGreyscaleImage();
  const {
    mutate: mutateCoinMosaic,
    data: coinData,
    isSuccess: isCoinSuccess,
  } = useCoinMosaic();
  const [coinMosaicInputArray, setCoinMosaicInputArray] =
    useState<number[][]>();

  const [coinCount, setCoinCount] = useState(0);

  const coinCost = useMemo(() => {
    if (coinCount !== undefined) {
      return (coinCount / 100).toFixed(2);
    }
  }, [coinCount]);

  useEffect(() => {
    if (coinMosaicInputArray !== undefined) {
      mutateCoinMosaic({ intensityEnumArray: coinMosaicInputArray });
      setCoinCount(
        coinMosaicInputArray.length * coinMosaicInputArray[0].length
      );
    }
  }, [mutateCoinMosaic, setCoinCount, coinMosaicInputArray]);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Container size="md">
        <Grid align="center">
          <Grid.Col span={9}>
            <Title p="sm">Coin Mosaic</Title>
          </Grid.Col>
          <Grid.Col span={3}>
            <ColourSchemeToggle />
          </Grid.Col>
        </Grid>
        <Center>
          <UploadModal mutate={mutateGreyscale} />
        </Center>
        {!!greyData && (
          <Stack mt="lg" h={300} align="stretch" justify="flex-start" gap="md">
            <Image radius="md" src={greyData.outputImageUrl} />
            <GreyscaleImageManipulator
              greyData={greyData}
              setCoinMosaicInputArray={setCoinMosaicInputArray}
            />
            <h1>Total 1ps: {coinCount}</h1>
            <h1>Cost: £{coinCost}</h1>
            {!!coinData && isCoinSuccess && <Image src={coinData} />}
          </Stack>
        )}
      </Container>
    </MantineProvider>
  );
}
