import { SchematicNBT } from '@/interfaces/SchematicNBT';
import { CodeHighlight } from '@mantine/code-highlight';
import { Title } from '@mantine/core';

export function NBTDisplay({ nbtData }: { nbtData: SchematicNBT }) {
  if (nbtData == null) {
    return (
      <div>
        <Title>NBT Data</Title>
        <CodeHighlight code={JSON.stringify(null)} />
      </div>
    );
  }

  return (
    <div>
      <Title>NBT Data</Title>
      <CodeHighlight code={JSON.stringify(nbtData.data.data, null, 2)} />
    </div>
  );
}
