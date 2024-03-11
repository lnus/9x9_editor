import { SchematicJSON, RootEntry } from '@/interfaces/SchematicJSON';
import { Text, Image, Badge, Button, Card, Group, List, Title } from '@mantine/core';

function ItemDisplay({ item }: { item: RootEntry }) {
  const name = item.item.id;
  const count = item.count;
  const icon = 'https://via.placeholder.com/150';

  return (
    <Card key={name} style={{ width: '240px', padding: '1em' }}>
      <Card.Section>
        <Image src={icon} height={160} alt={name} />
      </Card.Section>
      <Group>
        <Text>{name}</Text>
        <Badge color="primary" variant="light">
          {count}
        </Badge>
      </Group>
      <Button
        variant="outline"
        color="blue"
        fullWidth
        // onClick would be implemented to handle the name change
      >
        Change Name
      </Button>
    </Card>
  );
}

export function MaterialList({
  jsonData,
  setJsonData,
}: {
  jsonData: SchematicJSON;
  setJsonData: (json: SchematicJSON) => void;
}) {
  // For now, just iterate over the jsonData.header.material_list.item_entry -> ItemEntry[]
  if (!jsonData) {
    return <p>No JSON data found</p>;
  }

  return (
    <div>
      <Title order={2} mb="md">
        Material List
      </Title>
      <List>
        {jsonData.header.material_list.root_entry.map((item, index) => (
          <ItemDisplay key={index} item={item} />
        ))}
      </List>
    </div>
  );
}
