import { useEffect, useMemo, useState } from "react";

import { GBP_ONE_PENNY } from "@/components/Coin/CoinTypes";
import { ColourSchemeToggle } from "@/components/ColorSchemeToggle/ColourSchemeToggle";
import GreyscaleImageManipulator from "@/features/ImageManipulationPage/GreyscaleImageManipulator";
import UploadModal from "@/features/UploadModal/UploadModal";
import { useCoinMosaic } from "@/hooks/useCoinMosaic";
import { useGreyscaleImage } from "@/hooks/useGreyscaleImage";
import {
  Center,
  Container,
  Divider,
  Grid,
  Image,
  MantineProvider,
  Stack,
  Table,
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

  const coinWeight = useMemo(() => {
    if (coinCount !== undefined) {
      return ((coinCount * GBP_ONE_PENNY.massInGrams) / 1000).toFixed(2);
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
      <Container size="md" mb="md">
        <Grid align="center">
          <Grid.Col span={9}>
            <Title p="sm">Image Edit Crafts</Title>
          </Grid.Col>
          <Grid.Col span={3}>
            <ColourSchemeToggle />
          </Grid.Col>
        </Grid>
        <Center>
          <UploadModal mutate={mutateGreyscale} />
        </Center>
        {!!greyData && (
          <Stack mt="lg" h={300} align="stretch" justify="flex-start" gap="sm">
            <Image radius="md" src={greyData.outputImageUrl} />
            <GreyscaleImageManipulator
              greyData={greyData}
              setCoinMosaicInputArray={setCoinMosaicInputArray}
            />

            {!!coinData && isCoinSuccess && (
              <Stack gap="xs" justify="center">
                <Table captionSide="bottom">
                  <Table.Caption>
                    Some stats about your mosaic made from 1p coins
                  </Table.Caption>
                  <Table.Tbody>
                    <Table.Tr key="weight">
                      <Table.Td>Total 1p Coins</Table.Td>
                      <Table.Td>{coinCount}</Table.Td>
                    </Table.Tr>
                    <Table.Tr key="cost">
                      <Table.Td>Cost</Table.Td>
                      <Table.Td>£{coinCost}</Table.Td>
                    </Table.Tr>
                    <Table.Tr key="weight">
                      <Table.Td>Mosaic Weight</Table.Td>
                      <Table.Td>{coinWeight}Kg</Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
                <Image radius="md" src={coinData} />
              </Stack>
            )}
            <Divider m="lg" />
          </Stack>
        )}
      </Container>
    </MantineProvider>
  );
}
