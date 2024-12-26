import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
    onSuccess: (data) => {
      console.log(data);

      const blob = new Blob([new Uint8Array(data.data)]);
      queryClient.setQueryData(["greyscaleImage"], URL.createObjectURL(blob));
    },
  });
};
