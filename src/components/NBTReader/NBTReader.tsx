import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Code } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './NBTReader.module.css';
import pako from 'pako';
import * as NBT from 'nbtify';
import { notifications } from '@mantine/notifications';
import { SchematicNBT } from '@/interfaces/SchematicNBT';
import { useData } from '@/contexts/DataContext';

export function NBTReader() {
  const { setNbtData, setJsonData } = useData();

  // ANCHOR: UX state
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (files: File[]) => {
    // TODO: Maybe failsafe and check if MIME type is correct
    console.log('Files dropped', files);

    // Set loading state
    setLoading(true);

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
    console.log('Handling body', body);

    // Body is a base64 encoded string
    const binaryString = atob(body);

    // Convert to a byte array
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    console.log('Decoded base64', bytes);

    // Not used, this is just for debugging recompression
    // NOTE: This just prints the uncompressed data
    // This is useful to read the original size of the data
    const decompressed = pako.inflate(bytes);
    console.log('Decompressed data', decompressed);

    try {
      const data = (await NBT.read(bytes)) as SchematicNBT;

      console.log('Parsed NBT data', data);

      setNbtData(data);

      // Set loading state
      setLoading(false);

      notifications.show({
        title: 'Schematic uploaded 🥳',
        message: 'The schematic was successfully uploaded and parsed',
      });
    } catch (error) {
      console.error('Error parsing NBT', error);

      notifications.show({
        title: 'Error parsing NBT',
        message: 'There was an error parsing the NBT data',
        color: 'red',
      });
    }
  };

  // TODO: Rework some styles
  return (
    <div className={classes.wrapper}>
      <Dropzone
        loading={loading}
        openRef={openRef}
        onDrop={onDrop}
        className={classes.dropzone}
        radius="md"
        accept={['application/json']}
        maxSize={1024 * 1024 ** 2} // 1mb
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
            <Dropzone.Reject>Incorrect file type</Dropzone.Reject>
            <Dropzone.Idle>Upload schematic file</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop schematic files here to upload.
          </Text>
        </div>
      </Dropzone>

      {/* <Button
        fullWidth
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Upload schematic
      </Button> */}
    </div>
  );
}
