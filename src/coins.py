from enum import Enum

class Coin(Enum):
    PS_1P = (3.56, 20.3) 
    
    def __init__(self, mass, diameter):
        self.mass = mass
        self.diameter = diameter