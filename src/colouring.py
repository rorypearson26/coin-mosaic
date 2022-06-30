import numpy as np


def colour_mapping(sliders, colour_shades, mosaic_obj):
    coin_array = np.copy(mosaic_obj.pixel_array)
    shade_variants = colour_shades.shape[1]
    total_sliders = len(sliders)
    test_outarray = np.zeros((coin_array.shape[0], coin_array.shape[1]), dtype=(int))

    for i in range(0, total_sliders):
        low_val = sliders[i]["lowVal"]
        high_val = sliders[i]["highVal"]
        slider_range = high_val - low_val + 1
        get_colour = lambda x: colour_shades[i, x]

        f = np.logical_and(
            low_val <= coin_array, coin_array <= (low_val + slider_range / 2)
        )
        test_outarray = np.where(
            f,
            np.random.randint(0, shade_variants / 2, f.shape),
            test_outarray,
        )
        mosaic_obj.coin_array = np.where(
            f,
            get_colour(test_outarray),
            mosaic_obj.coin_array,
        )
        f = np.logical_and(
            (low_val + slider_range / 2) <= coin_array, coin_array <= high_val
        )
        test_outarray = np.where(
            f,
            np.random.randint(shade_variants / 2, shade_variants, f.shape),
            test_outarray,
        )

        mosaic_obj.coin_array = np.where(
            f,
            get_colour(test_outarray),
            mosaic_obj.coin_array,
        )

def colour_randomiser(deviation, colour):
    """Subtly adjust coin colours so not an unrealistic block colour. The randomness value is also
    adjusted depending on whether the intensity value is close the slider min or max."""
    colour_new = np.empty(3, dtype=int)

    for i, hue in enumerate(colour):
        colour_rand = int(deviation * hue)

        if colour_rand <= 0:
            colour_new[i] = int(0)
        elif colour_rand >= 255:
            colour_new[i] = int(255)
        else:
            colour_new[i] = colour_rand

        colour_new_formatted = f"rgb({colour_new[0]},{colour_new[1]},{colour_new[2]})"
    return colour_new_formatted


def get_colour_shades(sliders, deviation):
    """Create array of shades from darkest at index[0] to lightest at index[max]"""
    total_sliders = len(sliders)
    shades_per_slider = round((100.0 * deviation * 2), None)
    colour_shades = np.empty([total_sliders, shades_per_slider], dtype=("U20"))
    current_deviation = float(0)

    for i, slider in enumerate(sliders):
        colour = ImageColor.getrgb(slider["colour"])
        for j in range(0, shades_per_slider):
            current_deviation = ((100.0 - (deviation * 100.0)) + j) / 100
            colour_shades[i, j] = colour_randomiser(current_deviation, colour)

    return colour_shades
