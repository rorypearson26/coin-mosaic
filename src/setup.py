from pathlib import Path

SRC_PATH = Path(__file__).parent.resolve()
INPUT_FILES = SRC_PATH / "input_files"


class Setup:
    def __init__(self, filename, dimensions) -> None:
        self.filename = self.get_filename(filename)
        self.spec_width, self.spec_height = process_dimensions(dimensions)

    def get_filename(self, filename):
        filename = INPUT_FILES / filename
        return filename


def process_dimensions(dimensions):
    """Populate width and height appropriately based on specified dimensions.

    Args:
        dimensions (tuple(`str`, `int`)): Tuple in the form of specified dimension and 
            the corresponding value (in mm). To specify a width of 3200mm you would put 
            in `('w': 3200)`.
    """
