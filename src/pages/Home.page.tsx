import { useState } from 'react';
import { NBTReader } from '@/components/NBTReader/NBTReader';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { SchematicNBT } from '@/interfaces/SchematicNBT';
import { NBTDisplay } from '@/components/NBTReader/NBTDisplay';
import { Button, Center, Code, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MaterialList } from '@/components/JSONDisplay/JSONDisplay';
import { NavbarMinimal } from '@/components/NavbarMinimal/NavbarMinimal';

export function HomePage() {
  const [drawerOpened, { open, close }] = useDisclosure(false);
  const [jsonData, setJsonData] = useState<any>(null);
  const [nbtData, setNbtData] = useState<SchematicNBT | null>(null);

  return (
    <div>
      <ColorSchemeToggle />
      <NBTReader setNbtData={setNbtData} setJsonData={setJsonData} />
      <MaterialList jsonData={jsonData} setJsonData={setJsonData} />

      <Drawer
        opened={drawerOpened}
        onClose={close}
        radius="md"
        offset={8}
        position="bottom"
        size="xl"
        withCloseButton={false}
      >
        <h1>JSON Data</h1>
        <Code>{JSON.stringify(jsonData, null, 2)}</Code>

        <NBTDisplay nbtData={nbtData as SchematicNBT} />
      </Drawer>

      <Center p="sm">
        <Button onClick={open}>Display debug information</Button>
      </Center>

      {/* <ButtonCopy rootObject={rootObject} />
      <JsonModal setRootObject={setRootObject} />
      <ListDisplay rootObject={rootObject as Root} setRootObject={setRootObject} /> */}
    </div>
  );
}
