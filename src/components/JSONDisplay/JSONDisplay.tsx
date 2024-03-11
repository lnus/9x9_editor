import { SchematicJSON, RootEntry } from '@/interfaces/SchematicJSON';
import { Text, Image, Badge, Button, Card, Group, Grid, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from 'react';
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
    <Grid.Col span={4} key={name}>
      <Card style={{ padding: '1em' }}>
        <Card.Section>
          <Image src={icon} height={150} alt={name} />
        </Card.Section>
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
    </Grid.Col>
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

  return (
    <div>
      <TextInput
        placeholder="Search for an item"
        radius="md"
        value={searchQuery}
        m="lg"
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
      />
      <Grid m="lg">
        {jsonData.header.material_list.root_entry
          .filter((item) => {
            return item.item.id.toLowerCase().includes(searchQuery.toLowerCase());
          })
          .map((item, index) => (
            <ItemDisplay key={index} item={item} updateItem={updateItem} />
          ))}
      </Grid>
    </div>
  );
}
