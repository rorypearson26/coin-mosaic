import cv2 as cv

from src.model.raw_image import RawImage
from src.setup import Setup


def get_scale_percentage(config: Setup, raw_image: RawImage):
    if config.spec_height:
        coins_in_height = config.spec_height / config.coin.diameter
        return coins_in_height / raw_image.height
    else:
        coins_in_width = config.spec_width / config.coin.diameter
        return coins_in_width / raw_image.width


def __scale_image(self, input_image=None):
    input_image = self.raw.image if input_image is None else input_image
    scaled_image = cv.resize(
        input_image, (self.width_pixels, self.height_pixels), interpolation=cv.INTER_AREA
    )
    return scaled_image


def process_image(self, use_scaled_pre=True, post_scale=True):
    input_image = self.scaled if use_scaled_pre else self.raw.image
    result = cv.equalizeHist(input_image)
    if post_scale:
        result = self.__scale_image(result)
    return result
