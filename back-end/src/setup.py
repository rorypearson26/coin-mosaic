from pathlib import Path
from src.model.coin import Coin

SRC_PATH = Path(__file__).parent.resolve()
INPUT_FILES = SRC_PATH / "input_files"


class Setup:
    def __init__(self, args):
        self.filename = INPUT_FILES / args.file
        self.spec_width, self.spec_height = process_dimensions(
            args.dimension, args.length)
        self.coin = Coin[args.coin.upper()]


def process_dimensions(dimension, length):
    """Populate width and height appropriately based on specified dimensions.

    """
    if dimension not in ['w', 'h']:
        raise AttributeError('`w` or `h` has not been specified for coin mosaic specified dimension.')
    width = length if dimension == 'w' else None
    height = length if dimension == 'h' else None
    return width, height
