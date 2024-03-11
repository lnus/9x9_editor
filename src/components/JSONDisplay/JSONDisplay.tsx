import { SchematicJSON, RootEntry } from '@/interfaces/SchematicJSON';
import {
  Text,
  Image,
  Badge,
  Button,
  Card,
  Group,
  Grid,
  Title,
  TextInput,
  Center,
} from '@mantine/core';
import { useState } from 'react';

function ItemDisplay({ item }: { item: RootEntry }) {
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
        {/* <Button>Change Name</Button> */}
      </Card>
    </Grid.Col>
  );
}

export function MaterialList({
  jsonData,
  setJsonData,
}: {
  jsonData: SchematicJSON;
  setJsonData: (json: SchematicJSON) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!jsonData) {
    return <p>No JSON data found</p>;
  }

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
            <ItemDisplay key={index} item={item} />
          ))}
      </Grid>
    </div>
  );
}
