from argparse import ArgumentParser
from src.setup import Setup

def parse_args():
    parser = ArgumentParser()
    parser.add_argument('--file', default='convert_test.jpg', help='Name of the image file.')
    parser.add_argument('--dimension', default='d', help='Specified dimension of output mosaic.')
    parser.add_argument('--length', default=1200, type=int, help='Specified dimension of output mosaic.')
    args = parser.parse_args()
    return args
    
if __name__ == "__main__":
    args = parse_args()
    setup = Setup(args)
    print(setup.filename)
    print(f'Height is {setup.spec_height}')
    print(f'Width is {setup.spec_width}')