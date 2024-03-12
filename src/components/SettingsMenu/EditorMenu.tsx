import { useData } from '@/contexts/DataContext';
import { Container, Divider, Space, Stack, Title } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
  IconArrowsShuffle,
  IconChartPie,
  IconCheck,
  IconCopy,
  IconDeviceFloppy,
  IconGraph,
  IconUpload,
} from '@tabler/icons-react';
import { SettingsButton } from './SettingsButton';
import { modals } from '@mantine/modals';
import { BlockCountGraph } from '../Statistics/BlockCountGraph';
import { NBTWriter } from '../NBTReader/NBTWriter';
import { NBTReader } from '../NBTReader/NBTReader';

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
          document.body.appendChild(element); // Required for this to work in Firefox
          element.click();
        }}
        icon={<IconDeviceFloppy />}
      />
      <SettingsButton
        tooltipLabel="Upload schematic"
        onClick={() => {
          modals.open({
            withCloseButton: false,
            size: '60%',
            centered: true,
            children: <NBTReader />,
          });
        }}
        icon={<IconUpload />}
      />
      <SettingsButton
        tooltipLabel="Convert to another format"
        onClick={() => {
          modals.open({
            withCloseButton: false,
            centered: true,
            children: <Title order={6}>Not implemented yet, sorry 😔</Title>,
          });
        }}
        icon={<IconArrowsShuffle />}
      />
      <Space />
      <SettingsButton
        tooltipLabel="View block count chart"
        onClick={() => {
          modals.open({
            withCloseButton: false,
            size: '60%',
            centered: true,
            children: <BlockCountGraph />,
          });
        }}
        icon={<IconChartPie />}
      />
    </Stack>
  );
};
