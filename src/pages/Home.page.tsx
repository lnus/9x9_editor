import { NBTReader } from '@/components/NBTReader/NBTReader';
import { SchematicNBT } from '@/interfaces/SchematicNBT';
import { Container, Grid, Skeleton, Stack } from '@mantine/core';
import { MaterialList } from '@/components/JSONDisplay/JSONDisplay';
import { SchematicJSON } from '@/interfaces/SchematicJSON';
import { notifications } from '@mantine/notifications';
import { NBTData } from 'nbtify';
import * as NBT from 'nbtify';
import { useData } from '@/contexts/DataContext';
import { JsonExport } from '@/components/JsonExport/JsonExport';

export function HomePage() {
  const { jsonData, setJsonData, nbtData, setNbtData } = useData();

  // TODO: Move these functions to a separate file

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
      <Container fluid mx={0} my="sm">
        {/* Split the page into two columns, main content on left, and menu on right */}
        <Grid grow>
          <Grid.Col span={1}>
            <Container fluid mx="xs">
              {!jsonData && <NBTReader />}
              {jsonData && <MaterialList updateItem={updateItem} />}
              {/* TODO: Remove Temporary json export button */}
              {jsonData && <JsonExport />}
            </Container>
          </Grid.Col>
          <Grid.Col span={0}>
            <Stack align="center">
              {Array.from({ length: 15 }).map((_, index) => (
                <Skeleton key={index} height={40} width={40} radius="md" />
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
