import { SchematicJSON, RootEntry } from '@/interfaces/SchematicJSON';
import {
  Text,
  Image,
  Badge,
  Button,
  Card,
  Group,
  Grid,
  TextInput,
  Tabs,
  TabsList,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { Autocomplete } from '@mantine/core';
import { MinecraftItems } from '@/data/MinecraftItems';

const ModalContent = ({
  name,
  updateItem,
}: {
  name: string;
  updateItem: (oldItem: string, newItem: string) => void;
}) => {
  const [value, setValue] = useState('');

  const handleConfirm = () => {
    updateItem(name, value);
    modals.closeAll();
  };

  return (
    <Group justify="center">
      <Autocomplete
        data={MinecraftItems}
        placeholder="New type"
        value={value}
        onChange={setValue}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleConfirm();
          }
        }}
      />

      <Button color="teal" onClick={() => handleConfirm()}>
        Confirm change
      </Button>
    </Group>
  );
};

function ItemDisplay({
  item,
  updateItem,
}: {
  item: RootEntry;
  updateItem: (oldItem: string, newItem: string) => void;
}) {
  const name = item.item.id;
  const count = item.count;
  const icon = 'https://via.placeholder.com/150';

  return (
    <Card style={{ padding: '1em' }}>
      <Group justify="center" gap="sm">
        <Text>{name}</Text>
        <Badge>{count}</Badge>
      </Group>
      {/* Open a modal to change the name */}
      <Button
        onClick={() => {
          modals.open({
            centered: true,
            title: 'Change item type',
            children: <ModalContent name={name} updateItem={updateItem} />,
          });
        }}
      >
        Change Name
      </Button>
    </Card>
  );
}

export function MaterialList({
  jsonData,
  setJsonData, // Might not be used here
  updateItem,
}: {
  jsonData: SchematicJSON;
  setJsonData: (json: SchematicJSON) => void;
  updateItem: (oldItem: string, newItem: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<RootEntry[]>(jsonData.header.material_list.root_entry);
  const [mods, setMods] = useState<string[]>([]);

  useEffect(() => {
    const newItems = jsonData.header.material_list.root_entry.filter((item) => {
      return item.item.id.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setItems(newItems); // This is just visual, the original data is not changed

    // Get all the mods
    const mods = newItems.map((item) => item.item.id.split(':')[0]);
    setMods(Array.from(new Set(mods)));
  }, [jsonData, searchQuery]);

  return (
    <div>
      <TextInput
        placeholder="Search for an item"
        radius="md"
        value={searchQuery}
        m="lg"
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
      />
      <Tabs color="red">
        <Tabs.List>
          {mods.map((mod, index) => (
            <Tabs.Tab key={index} value={mod}>
              <Text size="xl">{mod.slice(0, 1).toUpperCase() + mod.slice(1)}</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {mods.map((mod, index) => (
          <Tabs.Panel key={index} value={mod}>
            {items.map((item, index) => (
              <div key={index}>
                {item.item.id.split(':')[0] === mod && (
                  <ItemDisplay key={item.item.id} item={item} updateItem={updateItem} />
                )}
              </div>
            ))}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
