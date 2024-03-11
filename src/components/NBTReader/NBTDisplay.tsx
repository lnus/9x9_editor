import { SchematicNBT } from '@/interfaces/SchematicNBT';
import { Code } from '@mantine/core';

export function NBTDisplay({ nbtData }: { nbtData: SchematicNBT }) {
  // We need to convert BigInts to strings
  // This is a *very* temporary solution
  const convertBigInts = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'bigint') {
        obj[key] = obj[key].toString();
      }
      if (typeof obj[key] === 'object') {
        convertBigInts(obj[key]);
      }
    }

    return obj;
  };

  return (
    <div>
      <h1>NBT Data</h1>
      <Code>{JSON.stringify(convertBigInts(nbtData), null, 2)}</Code>
    </div>
  );
}
