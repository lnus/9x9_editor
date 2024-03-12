import { ActionIcon, Stack } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

export const EditorMenu = () => {
  return (
    <Stack align="center">
      <ActionIcon variant="subtle" aria-label="Copy JSON">
        <IconAdjustments />
      </ActionIcon>
    </Stack>
  );
};
