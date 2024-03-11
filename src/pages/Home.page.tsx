import { useState } from 'react';
import { NBTReader } from '@/components/NBTReader/NBTReader';
import { SchematicNBT } from '@/interfaces/SchematicNBT';
import { NBTDisplay } from '@/components/NBTReader/NBTDisplay';
import { Button, Center, Collapse, Container, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MaterialList } from '@/components/JSONDisplay/JSONDisplay';
import { SchematicJSON } from '@/interfaces/SchematicJSON';
import { notifications } from '@mantine/notifications';
import { NBTWriter } from '@/components/NBTReader/NBTWriter';
import { NBTData } from 'nbtify';
import * as NBT from 'nbtify';
import { JsonExport } from '@/components/JsonExport/JsonExport';
import { CodeHighlight } from '@mantine/code-highlight';

export function HomePage() {
  const [debugInfo, { toggle }] = useDisclosure(false);
  const [jsonData, setJsonData] = useState<SchematicJSON | null>(null);
  const [nbtData, setNbtData] = useState<SchematicNBT | null>(null);

  const updateItem = async (oldItem: string, newItem: string) => {
    console.log('Updating item', oldItem, newItem);

    // Update the JSON data for the material list
    const newJsonData = { ...jsonData } as SchematicJSON;
    const jsonIndex = newJsonData.header.material_list.root_entry.findIndex(
      (root) => root.item.id === oldItem
    );

    console.log('Index of item', jsonIndex);
    newJsonData.header.material_list.root_entry[jsonIndex].item.id = newItem;

    // Update the NBT data
    // Hacky way to get a temporary nbtData object
    // Decode and encode again after
    // NOTE: We can't copy the object in JS because it messes up the NBT data
    const result: Uint8Array = await NBT.write(nbtData as NBTData);
    const decoded = (await NBT.read(result)) as SchematicNBT;

    console.log('Encoded NBT data', result);
    console.log('Decoded NBT data', decoded);

    // Modify NBT thing
    // First, find the index of the item
    const index = decoded.data.data.findIndex((item: any) => item.state.Name === oldItem);
    console.log('Index of item', index);

    // Then, replace the item with the new one
    decoded.data.data[index].state.Name = newItem;

    setNbtData(decoded);

    // Notifying the user
    notifications.show({
      title: 'Item updated',
      message: `Updated ${oldItem} to ${newItem}`,
      color: 'teal',
    });
  };

  return (
    <div>
      <Container>
        {/* <ColorSchemeToggle /> */}
        <NBTReader setNbtData={setNbtData} setJsonData={setJsonData} />

        {nbtData && jsonData && (
          <div>
            <NBTWriter nbtData={nbtData} jsonData={jsonData} setJsonData={setJsonData} />
            <JsonExport jsonData={jsonData as SchematicJSON} />
          </div>
        )}

        {jsonData && (
          <MaterialList jsonData={jsonData} setJsonData={setJsonData} updateItem={updateItem} />
        )}

        <Center p="sm">
          <Button onClick={toggle}>Display debug information</Button>
        </Center>

        <Collapse in={debugInfo}>
          <Container>
            <Title>JSON Data</Title>
            <CodeHighlight code={JSON.stringify(jsonData, null, 2)} />

            <NBTDisplay nbtData={nbtData as SchematicNBT} />
          </Container>
        </Collapse>
      </Container>
    </div>
  );
}
