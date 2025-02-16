import { FC } from "react";
import { MdDarkMode, MdSunny } from "react-icons/md";

interface ColourSchemeIconProps {
  isDark: boolean;
  iconSize: number;
}

const ColourSchemeIcon: FC<ColourSchemeIconProps> = ({ isDark, iconSize }) => {
  return isDark ? <MdDarkMode size={iconSize} /> : <MdSunny size={iconSize} />;
};

export default ColourSchemeIcon;
