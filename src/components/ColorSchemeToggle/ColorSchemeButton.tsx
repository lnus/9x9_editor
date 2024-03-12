import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSunHigh, IconMoonStars } from '@tabler/icons-react';

export const ColorSchemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon onClick={toggleColorScheme} variant="subtle" aria-label="Copy JSON">
      {colorScheme === 'dark' ? <IconSunHigh /> : <IconMoonStars />}
    </ActionIcon>
  );
};
