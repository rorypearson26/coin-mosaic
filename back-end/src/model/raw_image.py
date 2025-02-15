import numpy as np
import cv2 as cv


class RawImage:
    def __init__(self, setup):
        self.info = setup
        self.image = self.__get_raw()
        self.height = self.image.shape[0]
        self.width = self.image.shape[1]

    def __get_raw(self):
        image_array = np.fromfile(self.info.filename, np.uint8)
        return cv.imdecode(image_array, cv.IMREAD_GRAYSCALE)
    