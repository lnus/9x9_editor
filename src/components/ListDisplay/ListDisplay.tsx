import { RootEntry, Root } from '@/interfaces/Gadget';
import { Group, TextInput } from '@mantine/core';
import { IconAlien } from '@tabler/icons-react';
import { useState } from 'react';

function ItemDisplay({
  index,
  item,
  updateItemID,
}: {
  index: number;
  item: RootEntry;
  updateItemID: (index: number, newID: string) => void;
}) {
  const [itemID, setItemID] = useState(item.item.id);

  return (
    <Group>
      {/* Arbitrary icon */}
      <IconAlien />
      {/* Item ID should be editable, but not the count */}
      <TextInput
        value={itemID}
        onChange={(event) => {
          setItemID(event.currentTarget.value);
          updateItemID(index, event.currentTarget.value);
        }}
      />
      <p>{item.count}</p>
    </Group>
  );
}

export function ListDisplay({
  rootObject,
  setRootObject,
}: {
  rootObject: Root;
  setRootObject: (root: Root) => void;
}) {
  // Update the item ID of a root entry and set the root object
  const updateItemID = (index: number, newID: string) => {
    const newRootObject = { ...rootObject };
    newRootObject.header.material_list.root_entry[index].item.id = newID;
    setRootObject(newRootObject);
  };

  if (!rootObject) {
    return <h1>No root object</h1>;
  }

  return (
    <div>
      <h1>
        {rootObject.header.name} - {rootObject.header.author}
      </h1>

      {/* Iterate over the root entry list */}
      {rootObject.header.material_list.root_entry.map((entry, index) => (
        <ItemDisplay key={index} index={index} item={entry} updateItemID={updateItemID} />
      ))}
    </div>
  );
}
