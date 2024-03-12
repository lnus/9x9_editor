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

  const encodeAndSave = async () => {
    // Encode the data using NBT.write
    console.log(nbtData);
    const result: Uint8Array = await NBT.write(nbtData as NBT.NBTData);

    console.log('Encoded NBT data', result);

    // Encode into base64
    const base64Data = btoa(String.fromCharCode(...result));

    console.log('Base64 NBT data', base64Data);

    // Update the JSON data (only body)
    const newJsonData = { ...jsonData } as SchematicJSON;
    newJsonData.body = base64Data;

    // Update the state
    setJsonData(newJsonData);

    // Notify the user
    // TODO: Remove in prod, this isn't necessary since we run it all the time now
    notifications.show({
      title: 'NBT data written',
      message: 'NBT data has been written and JSON has been updated',
    });
  };

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

    // Modify NBT
    // Find all indices of the old item in the NBT data
    // They could have different states
    const indices = decoded.data.data
      .map((item: any, index: number) => (item.state.Name === oldItem ? index : -1))
      .filter((index) => index !== -1);
    console.log('Indices of item', indices);

    // Replace all instances of the old item with the new one
    indices.forEach((index) => {
      decoded.data.data[index].state.Name = newItem;
      console.log('Updated item', decoded.data.data[index]);
    });

    setNbtData(decoded);

    // TODO
    // Maybe directly update the JSON body here, by encoding the NBT.
    await encodeAndSave();

    // Notifying the user
    notifications.show({
      title: 'Item(s) updated',
      message: `Updated all instances of ${oldItem} to ${newItem}`,
      color: 'teal',
    });
  };

  return (
    <div>
      <Container>
        <NBTReader setNbtData={setNbtData} setJsonData={setJsonData} />

        {nbtData && jsonData && (
          <div>
            {/* <NBTWriter nbtData={nbtData} jsonData={jsonData} setJsonData={setJsonData} /> */}
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
          <Title>JSON Data</Title>
          <CodeHighlight code={JSON.stringify(jsonData, null, 2)} />

          <NBTDisplay nbtData={nbtData as SchematicNBT} />
        </Collapse>
      </Container>
    </div>
  );
}
