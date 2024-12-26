from enum import Enum


class Colours(Enum):
    LIGHT_COPPER = (230, 158, 127)
    DARK_COPPER = (93, 45, 36)
    
    def __init__(self, red, green, blue):
        self.red = red
        self.green = green
        self.blue = blue
    
    def get_rgb_format(self):
        return f'{self.red}, {self.green}, {self.blue}'
