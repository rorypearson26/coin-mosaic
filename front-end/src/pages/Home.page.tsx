import {
  Button,
  Container,
  Group,
  MantineProvider,
  Modal,
  Title,
} from "@mantine/core";
import { InputForm } from "@/features/InputForm/InputForm";
import { useDisclosure } from "@mantine/hooks";
import { ColourSchemeToggle } from "@/components/ColorSchemeToggle/ColourSchemeToggle";
import { useGreyscaleMutation } from "@/api/useGreyscaleMutation";
import { useImageScaling } from "@/hooks/useImageScaling";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import GreyscaleImageManipulator from "@/features/GreyscaleImageManipulator";

export function HomePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [greyscaleUrl, setGreyscaleUrl] = useState("");
  const queryClient = useQueryClient();

  const useGreyscaleMutationResult = useGreyscaleMutation();
  const useImageScalingMutation = useImageScaling();

  const onClose = () => {
    close();
  };

  useEffect(() => {
    if (useImageScalingMutation.isSuccess) {
      const formData = new FormData();
      const { width, height } = useImageScalingMutation.variables.dimensions;

      formData.append("width", `${width}`);
      formData.append("height", `${height}`);
      formData.append("image", useImageScalingMutation.data!);

      useGreyscaleMutationResult.mutate(formData);
    }
  }, [useImageScalingMutation.isSuccess]);

  useEffect(() => {
    setGreyscaleUrl(queryClient.getQueryData(["greyscaleImage"])!);
  }, [useGreyscaleMutationResult.isSuccess, setGreyscaleUrl]);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Container>
        <Group>
          <Title p="md">Coin Mosaic</Title>
          <ColourSchemeToggle />
        </Group>
        <Button mt="20" onClick={open}>
          Add image
        </Button>
        <Modal
          opened={opened}
          onClose={onClose}
          title="Upload and crop image"
          size="xl"
        >
          <InputForm
            onClose={onClose}
            useImageScaling={useImageScalingMutation}
          />
        </Modal>
        {useGreyscaleMutationResult.isSuccess &&
          !!useGreyscaleMutationResult.data && (
            <GreyscaleImageManipulator inputImageUrl={greyscaleUrl} />
          )}
      </Container>
    </MantineProvider>
  );
}
