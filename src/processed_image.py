import cv2

from src.raw_image import RawImage

class ProcessedImage:
    def __init__(self, setup):
        self.info = setup
        self.raw = RawImage(setup)
        self.scale_percentage = self.scaler()
        self.height_pixels = int(self.scale_percentage * self.raw.height)
        self.width_pixels = int(self.scale_percentage * self.raw.width)
        self.pixel_array = cv2.resize(
            self.raw.image, (self.width_pixels, self.height_pixels), interpolation=cv2.INTER_AREA
        )

    def scaler(self):
        if self.info.spec_height:
            coins_in_height = self.info.spec_height / self.info.coin.diameter
            percentage = coins_in_height / self.raw.height
        else:
            coins_in_width = self.info.spec_width / self.info.coin.diameter
            percentage = coins_in_width / self.raw.width
        return percentage