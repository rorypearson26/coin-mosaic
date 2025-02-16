import 'react-image-crop/dist/ReactCrop.css';

import { useMemo, useState } from 'react';
import { CiWarning } from 'react-icons/ci';
import ReactCrop, { Crop } from 'react-image-crop';

import useCroppedImage from '@/hooks/useCroppedImage';
import { Alert, Button, Container, Image, Stack } from '@mantine/core';

import UploadFileButton from '../../components/UploadFile/UploadFileButton';

interface Props {
  onSubmit: (url: string) => void;
}

export function InputForm({ onSubmit }: Props) {
  const [crop, setCrop] = useState<Crop>();
  const [file, setFile] = useState<File>();
  const [imgSrc, setImgSrc] = useState("");
  const [isFileError, setIsFileError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useMemo(() => {
    if (crop === undefined || crop!.height < 1) {
      setShowPreview(false);
    } else {
      setShowPreview(true);
    }
  }, [crop, setShowPreview]);

  const handleFileUpload = (file: File | null) => {
    setCrop(undefined);
    if (isFileJpgOrPng(file!.name)) {
      setFile(file!);
      setImgSrc(URL.createObjectURL(file!));
      setIsFileError(false);
    } else {
      setIsFileError(true);
    }
  };

  const { croppedImage } = useCroppedImage(imgSrc, crop);

  const isFileJpgOrPng = (filename: string) => {
    const extension = /[.]/.exec(filename)
      ? /[^.]+$/.exec(filename)?.[0]
      : undefined;
    const validExtensions = ["png", "jpg"];
    if (extension !== undefined && validExtensions.includes(extension)) {
      return true;
    }
    return false;
  };

  return (
    <Stack>
      <UploadFileButton
        file={file}
        fileHandler={handleFileUpload}
        buttonText="Upload a png or jpg file"
      />
      {isFileError && (
        <Alert
          variant="light"
          color="red"
          title="Invalid File Uploaded"
          icon={<CiWarning />}
        >
          Upload file needs to be jpg or png
        </Alert>
      )}
      <ReactCrop
        crop={crop}
        onChange={(_, percent) => setCrop(percent)}
        ruleOfThirds
        minHeight={50}
        minWidth={50}
      >
        <Image radius="md" src={imgSrc} />
      </ReactCrop>
      {showPreview && (
        <Stack mt="lg">
          <Image radius="md" alt="cropped" src={croppedImage} />
          <Container size="xs">
            <Button mt="lg" onClick={() => onSubmit(croppedImage!)}>
              Start Image Processing
            </Button>
          </Container>
        </Stack>
      )}
    </Stack>
  );
}
