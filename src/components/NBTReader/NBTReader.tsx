import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Code } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './NBTReader.module.css';
import pako from 'pako';
import * as NBT from 'nbtify';
import { notifications } from '@mantine/notifications';
import { SchematicNBT } from '@/interfaces/SchematicNBT';

export function NBTReader({
  setNbtData,
  setJsonData,
}: {
  setNbtData: (nbt: SchematicNBT) => void;
  setJsonData: (json: any) => void;
}) {
  // ANCHOR: Data state
  // TODO: Remove this state management

  // ANCHOR: UX state
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  const onDrop = (files: File[]) => {
    // TODO: Maybe failsafe and check if MIME type is correct
    console.log('Files dropped', files);

    // We only process one schematic anyways
    // So, assume first file is the correct one
    const file = files[0];
    if (!file) {
      console.error('No file found');
      return;
    }

    // Read the file using a FileReader
    const reader = new FileReader();

    // ANCHOR: File parsing logic
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      if (result) {
        try {
          const jsonData = JSON.parse(result as string);
          setJsonData(jsonData);
          handleBody(jsonData?.body);
        } catch (error) {
          console.error('Error reading JSON', error);

          notifications.show({
            title: 'Error reading JSON',
            message: 'There was an error reading the JSON file',
            color: 'red',
          });
        }
      }
    };

    reader.readAsText(file);
  };

  const handleBody = async (body: string) => {
    // Body is a base64 encoded string
    const binaryString = atob(body);

    // Convert to a byte array
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    try {
      const data = await NBT.read(bytes);

      setNbtData(data);

      console.log(data);

      notifications.show({
        title: 'Schematic uploaded 🥳',
        message: 'The schematic was successfully uploaded and parsed',
        color: 'green',
      });
    } catch (error) {
      console.error('Error parsing NBT', error);

      notifications.show({
        title: 'Error parsing NBT',
        message: 'There was an error parsing the NBT data',
        color: 'red',
      });
    }

    // TODO: This works, but NBTify decompresses anyways
    // If that somehow fails, we can use this
    // try {
    // const decompressed = pako.inflate(bytes);
    // const buffer = decompressed.buffer;
    // } catch (error) {
    //   console.error('Error decompressing', error);
    // }
  };

  // TODO: Rework some styles
  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={onDrop}
        className={classes.dropzone}
        radius="md"
        accept={['application/json']}
        maxSize={30000 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload schematic file</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.json</i> files that
            are less than 30000mb in size. (It's client-side, so who cares?)
          </Text>
        </div>
      </Dropzone>

      <Button
        fullWidth
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Upload schematic
      </Button>
    </div>
  );
}
