import { useData } from '@/contexts/DataContext';
import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
  IconAdjustments,
  IconCheck,
  IconClipboardCopy,
  IconCopy,
  IconDeviceFloppy,
} from '@tabler/icons-react';
import { useState } from 'react';
import { SettingsButton } from './SettingsButton';

export const EditorMenu = () => {
  const { jsonData, setJsonData, nbtData, setNbtData } = useData();
  const clipboard = useClipboard();

  // Failsafe for null data
  if (jsonData === null || nbtData === null) {
    return null;
  }

  return (
    <Stack align="center">
      <SettingsButton
        tooltipLabel={clipboard.copied ? 'JSON copied!' : 'Copy JSON to clipboard'}
        onClick={() => {
          clipboard.copy(JSON.stringify(jsonData));
        }}
        icon={clipboard.copied ? <IconCheck /> : <IconCopy />}
      />
      <SettingsButton
        tooltipLabel="Download schematic"
        onClick={() => {
          const element = document.createElement('a');
          const file = new Blob([JSON.stringify(jsonData)], { type: 'text/plain' });
          element.href = URL.createObjectURL(file);
          element.download = 'schematic.json';
          document.body.appendChild(element); // Required for this to work in FireFox
          element.click();
        }}
        icon={<IconDeviceFloppy />}
      />
    </Stack>
  );
};
