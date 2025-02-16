import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { FC, useCallback, useState } from "react";
import ColourSchemeIcon from "./ColourSchemeIcon";

const ICON_SIZE = 18;

export const ColourSchemeToggle: FC = () => {
  const [isDark, setIsDark] = useState(true);

  const onChangeDarkness = useCallback(() => {
    const inverseColour = isDark ? "light" : "dark";
    setIsDark(!isDark);
    setColorScheme(inverseColour);
  }, [isDark, setIsDark]);

  const { setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={onChangeDarkness}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <ColourSchemeIcon isDark={isDark} iconSize={ICON_SIZE} />
    </ActionIcon>
  );
};
