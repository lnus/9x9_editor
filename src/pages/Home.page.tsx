import { NBTReader } from '@/components/NBTReader/NBTReader';
import { SchematicNBT } from '@/interfaces/SchematicNBT';
import { Container } from '@mantine/core';
import { MaterialList } from '@/components/JSONDisplay/JSONDisplay';
import { SchematicJSON } from '@/interfaces/SchematicJSON';
import { notifications } from '@mantine/notifications';
import { NBTData } from 'nbtify';
import * as NBT from 'nbtify';
import { useData } from '@/contexts/DataContext';
import { EditorMenu } from '@/components/SettingsMenu/EditorMenu';
import { NavCollapse } from '@/components/Navigation/NavCollapse';

export function HomePage() {
  const { jsonData, setJsonData, nbtData, setNbtData } = useData();

  // TODO: Move to a separate file
  const updateItem = async (oldItem: string, newItem: string) => {
    console.log('Updating item', oldItem, newItem);

    // Update the NBT data
    // NOTE: We can't copy the object in JS because it messes up the NBT data
    const result: Uint8Array = await NBT.write(nbtData as NBTData);
    const decoded = (await NBT.read(result)) as SchematicNBT;

    // Modify NBT
    // Search for all instances of the old item
    const indices = decoded.data.data
      .map((item: any, index: number) => (item.state.Name === oldItem ? index : -1))
      .filter((index) => index !== -1);

    // Replace all instances of the old item with the new one
    indices.forEach((index) => {
      decoded.data.data[index].state.Name = newItem;
      console.log('Updated item in NBT', decoded.data.data[index]);
    });

    // Encode and save the NBT data
    const newResult: Uint8Array = await NBT.write(decoded as NBTData);
    const base64Data = btoa(String.fromCharCode(...newResult));
    const newJsonData = { ...jsonData } as SchematicJSON;

    // Update the JSON body to the new base64 data
    newJsonData.body = base64Data;

    console.log('New base64 string:', base64Data);

    // Update the JSON data for the material list
    const jsonIndex = newJsonData.header.material_list.root_entry.findIndex(
      (root) => root.item.id === oldItem
    );
    newJsonData.header.material_list.root_entry[jsonIndex].item.id = newItem;

    // Update the state
    setJsonData(newJsonData);
    setNbtData(decoded);

    // Notify the user
    notifications.show({
      title: 'Item(s) updated successfully!',
      message: `Updated all instances of ${oldItem} to ${newItem}`,
    });
  };

  return (
    <NavCollapse asideContent={<EditorMenu />}>
      <Container size="xl" mx="auto" my="sm">
        {!jsonData && <NBTReader />}
        {jsonData && <MaterialList updateItem={updateItem} />}
      </Container>
    </NavCollapse>
  );
}
