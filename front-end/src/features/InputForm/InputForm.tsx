import { useMemo, useState } from "react";

import ReactCrop, { Crop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { Image, Container, Button } from "@mantine/core";
import UploadFileButton from "../../components/UploadFile/UploadFileButton";
import CropPreview from "./CropPreview";
import { UseMutationResult } from "@tanstack/react-query";
import { CreateDownsizedImage } from "@/hooks/useImageScaling";
import useCroppedImage from "@/hooks/useCroppedImage";

export interface Dimensions {
  width: number;
  height: number;
}

interface Props {
  onClose: () => void;
  useImageScaling: UseMutationResult<
    Blob,
    Error,
    CreateDownsizedImage,
    unknown
  >;
}

export function InputForm({ onClose, useImageScaling }: Props) {
  const [crop, setCrop] = useState<Crop>();
  const [file, setFile] = useState<File>();
  const [imgSrc, setImgSrc] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useMemo(() => {
    if (crop === undefined || crop!.height < 1) {
      setShowPreview(false);
    } else {
      setShowPreview(true);
    }
  }, [crop, setShowPreview]);

  const handleFileUpload = (file: File | null) => {
    setCrop(undefined);
    setFile(file!);
    setImgSrc(URL.createObjectURL(file!));
  };

  const { croppedImage, aspectRatio } = useCroppedImage(imgSrc, crop);

  const onSubmit = async () => {
    useImageScaling.mutate({
      inputImageUrl: croppedImage!,
      dimensions,
    });
    onClose();
  };

  return (
    <div>
      <UploadFileButton
        file={file}
        fileHandler={handleFileUpload}
        buttonText="Upload a png or jpg file"
      />
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
        <Container mt="lg" p="xl">
          <CropPreview
            croppedImageUrl={croppedImage!}
            aspectRatio={aspectRatio!}
            setDimensions={setDimensions}
          />
          <Button onClick={onSubmit}>Get Options</Button>
        </Container>
      )}
    </div>
  );
}
