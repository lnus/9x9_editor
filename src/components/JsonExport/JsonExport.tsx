import { Root } from '@/interfaces/Gadget';
import { Button, rem, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export function ButtonCopy({ rootObject }: { rootObject: Root | null }) {
  const clipboard = useClipboard();

  // Convert the root object to a JSON string
  const convertToJSON = () => {
    console.log(rootObject);
    return JSON.stringify(rootObject, null, 2);
  };

  return (
    <Tooltip
      label="JSON copied to clipboard"
      offset={5}
      position="bottom"
      radius="xl"
      transitionProps={{ duration: 100, transition: 'slide-down' }}
      opened={clipboard.copied}
    >
      <Button
        variant="light"
        rightSection={
          clipboard.copied ? (
            <IconCheck style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          ) : (
            <IconCopy style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          )
        }
        radius="xl"
        size="md"
        styles={{
          root: { paddingRight: rem(14), height: rem(48) },
          section: { marginLeft: rem(22) },
        }}
        onClick={() => {
          clipboard.copy(convertToJSON());
        }}
      >
        Copy JSON to clipboard
      </Button>
    </Tooltip>
  );
}
