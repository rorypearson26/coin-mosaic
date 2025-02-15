from unittest import TestCase, main

from src.model.colours import Colours


class TestColours(TestCase):
    def test_get_rgb_format(self):
        test_colour = Colours.DARK_COPPER

        result = test_colour.get_rgb_format()

        self.assertEqual(result, "93, 45, 36")


if __name__ == '__main__':
    main()
