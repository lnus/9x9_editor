import { ActionIcon, Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconSunHigh, IconMoonStars } from '@tabler/icons-react';

export const ColorSchemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // const toggleScheme = () => {
  //   setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  // };

  return (
    <ActionIcon onClick={toggleColorScheme} variant="subtle" aria-label="Copy JSON">
      {colorScheme === 'dark' ? <IconSunHigh /> : <IconMoonStars />}
    </ActionIcon>
  );

  // return (
  //   <Button onClick={toggleColorScheme} variant="subtle">
  //     {colorScheme === 'dark' ? <IconSunHigh /> : <IconMoonStars />}
  //   </Button>
  // );
};
