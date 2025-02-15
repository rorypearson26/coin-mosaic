import { FileButton, Button, Group, Text } from "@mantine/core";

interface Props {
  buttonText: string;
  file?: File;
  fileHandler?: (file: File | null) => void;
}

const UploadFileButton: React.FC<Props> = ({
  file,
  fileHandler,
  buttonText,
}) => {
  return (
    <>
      <Group justify="center">
        <FileButton onChange={fileHandler!} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>{buttonText}</Button>}
        </FileButton>
      </Group>

      {file && (
        <Group>
          <Text size="sm" ta="center" mt="sm">
            Picked file: {file.name}
          </Text>
        </Group>
      )}
    </>
  );
};

export default UploadFileButton;
