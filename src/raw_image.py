import numpy as np
import cv2

class RawImage:
    def __init__(self, setup):
        self.info = setup
        self.image = self.get_raw()
        self.height = self.image.shape[0]
        self.width = self.image.shape[1]

    def get_raw(self):
        image_array = np.fromfile(self.info.filename, np.uint8)
        raw_image = cv2.imdecode(image_array, cv2.IMREAD_GRAYSCALE)
        return raw_image
    