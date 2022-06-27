import numpy as np
from cv2 import cv2


class Image:
    def __init__(self, filename=None, raw_image=None) -> None:
        self.filename = filename
        self.raw = self.get_raw(raw_image)

    def get_raw(self, raw_image):
        if not raw_image:
            image_array = np.frombuffer(self.filename.read(), np.uint8)
            raw_image = cv2.imdecode(image_array, cv2.IMREAD_GRAYSCALE)

        return raw_image
