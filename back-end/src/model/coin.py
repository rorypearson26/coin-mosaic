from enum import Enum

from src.model.colours import Colours as c


class Coin(Enum):

    POUND_STERLING_1P = (3.56, 20.3, c.LIGHT_COPPER, c.DARK_COPPER)
    
    def __init__(self, mass, diameter, light_colour, dark_colour):
        self.mass = mass
        self.diameter = diameter
        self.light_colour = light_colour.get_rgb_format()
        self.dark_colour = dark_colour.get_rgb_format()