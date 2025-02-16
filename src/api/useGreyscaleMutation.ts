import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface GreyscaleManipulationDto {
  width: number;
  height: number;
  img_bytes: string;
  img_intensity_array: number[][];
}

export const useGreyscaleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post("http://0.0.0.0:8000/upload_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    mutationKey: ["greyscaleImage"],
    onSuccess: (response) => {
      const {
        width,
        height,
        img_bytes: imgBytes,
        img_intensity_array: imgIntensityArray,
      } = <GreyscaleManipulationDto>response.data;
      // const blob = new Blob([new Uint8Array(data.data)]);
      const size = imgIntensityArray.length * imgIntensityArray[0].length;
      console.log(size);
      queryClient.setQueryData(["greyscaleImage"], response.data);
    },
  });
};
