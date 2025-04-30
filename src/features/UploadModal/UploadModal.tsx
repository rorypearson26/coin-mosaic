import { FC } from 'react';

import { CreateGreyscaleImageInput } from '@/hooks/useGreyscaleImage';
import { Button, Container, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { InputForm } from './InputForm';

interface UploadModalProps {
  mutate: (url: CreateGreyscaleImageInput) => void;
}

const UploadModal: FC<UploadModalProps> = ({ mutate }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit = (url: string) => {
    mutate!({ inputImageUrl: url });
    close();
  };

  return (
    <Container>
      <Button onClick={open} style={{ width: 150 }}>
        Add image
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Upload and crop image"
        size="sm"
      >
        <InputForm onSubmit={onSubmit} />
      </Modal>
    </Container>
  );
};

export default UploadModal;
