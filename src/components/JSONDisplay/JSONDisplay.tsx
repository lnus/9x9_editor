import { SchematicJSON, RootEntry } from '@/interfaces/SchematicJSON';
import {
  Text,
  Button,
  Group,
  TextInput,
  Tabs,
  Paper,
  ThemeIcon,
  rem,
  Center,
  Container,
  Card,
  Grid,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { Autocomplete } from '@mantine/core';
import { MinecraftItems } from '@/data/MinecraftItems';
import { Icon3dCubeSphere, IconCompass } from '@tabler/icons-react';
import classes from './StatsCard.module.css';
import { useData } from '@/contexts/DataContext';

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

  // Reworking the card
  if (true) {
    return (
      <Card shadow="sm" padding="lg">
        <Group justify="space-between" mb={5}>
          <Text fw={500}>{name}</Text>
          <Button
            onClick={() => {
              modals.open({
                centered: true,
                title: 'Change item type',
                children: <ModalContent name={name} updateItem={updateItem} />,
              });
            }}
            variant="light"
            size="xs"
          >
            Change Item Type
          </Button>
        </Group>
        <Text>Count {count}</Text>
      </Card>
    );
  }
}

export function MaterialList({
  updateItem,
}: {
  updateItem: (oldItem: string, newItem: string) => void;
}) {
  const { jsonData } = useData();

  // Should never happen but just in case
  if (!jsonData) {
    return <Text>No JSON data found</Text>;
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<RootEntry[]>(jsonData.header.material_list.root_entry);
  const [mods, setMods] = useState<string[]>([]);

  useEffect(() => {
    const newItems = jsonData.header.material_list.root_entry.filter((item) => {
      return item.item.id.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setItems(newItems); // This is just visual, the original data is not changed

    // Get all the mods
    // TODO: This doesn't force reload the DOM
    // At least when the search list is empty
    // This can be solved by searching and then unsearching
    const mods = newItems.map((item) => item.item.id.split(':')[0]);
    setMods(Array.from(new Set(mods)));
  }, [jsonData, searchQuery]);

  return (
    <Container fluid>
      <TextInput
        placeholder={'Search for an item'} // TODO: Add keyboard shortcut
        radius="md"
        value={searchQuery}
        m="lg"
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
      />
      <Tabs radius="xs" orientation="vertical">
        <Tabs.List>
          {mods.map((mod, index) => (
            <Tabs.Tab key={index} value={mod} leftSection={<Icon3dCubeSphere />}>
              <Text size="xl">{mod.slice(0, 1).toUpperCase() + mod.slice(1)}</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {mods.map((mod, index) => (
          <Tabs.Panel key={index} value={mod} p={30}>
            <Grid>
              {items
                .filter((item) => item.item.id.split(':')[0] === mod)
                .map((item, index) => (
                  // Span might break with REALLY long item names
                  <Grid.Col span={4} key={index}>
                    <ItemDisplay key={index} item={item} updateItem={updateItem} />
                  </Grid.Col>
                ))}
            </Grid>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
}
