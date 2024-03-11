import { SchematicJSON } from '@/interfaces/SchematicJSON';
import { SchematicNBT } from '@/interfaces/SchematicNBT';
import { Button, Center } from '@mantine/core';
import * as NBT from 'nbtify';
import pako from 'pako';

export const NBTWriter = ({
  nbtData,
  jsonData,
  setJsonData,
}: {
  nbtData: SchematicNBT;
  jsonData: SchematicJSON;
  setJsonData: (json: SchematicJSON) => void;
}) => {
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
  };

  return (
    <Center>
      <Button onClick={encodeAndSave}>Write NBT and update JSON</Button>
    </Center>
  );
};
