import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, JsonInput, Group } from '@mantine/core';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Root } from '@/interfaces/Gadget';
import { Buffer } from 'buffer';

export function JsonModal({ setRootObject }: { setRootObject: (root: Root) => void }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [parsedJson, setParsedJson] = useState<Root | null>(null); // Parsed JSON
  const [isValidJson, setIsValidJson] = useState(false); // Track JSON validity

  const handleJsonChange = (value: string) => {
    // Validate JSON
    try {
      setParsedJson(JSON.parse(value));
      setIsValidJson(true);
      // Set parsed JSON
    } catch (e) {
      setIsValidJson(false);
    }
  };

  const decodeBody = (body: string) => {
    const buffer = Buffer.from(body, 'base64');
    console.log(buffer);
    console.log(buffer.toString('utf-8'));
  };

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Import JSON" withCloseButton>
        <JsonInput
          placeholder="Structure raw JSON..."
          validationError="Invalid JSON"
          onChange={handleJsonChange}
        ></JsonInput>

        <Group justify="flex-end" gap="md" p="md">
          <Button onClick={close} color="red">
            Cancel
          </Button>

          <Button
            onClick={() => {
              // This should already be verified if this is clickable
              // But, just in case, we'll check again
              if (!isValidJson) return;

              // Print the parsed JSON
              console.log(parsedJson);
              console.log(parsedJson?.header.author);

              // Set the root object
              setRootObject(parsedJson as Root);

              if (parsedJson?.body) decodeBody(parsedJson?.body);

              // Send success notification
              notifications.show({
                title: 'JSON Imported',
                message: 'The JSON has been successfully imported!',
                color: 'green',
              });

              // Close the modal
              close();
            }}
            disabled={!isValidJson}
          >
            Import
          </Button>
        </Group>
      </Modal>

      <Button
        onClick={() => {
          // Set valid to false
          // TODO: Might be a dumb way to do this but reset state
          setIsValidJson(false);

          open();
        }}
        variant="outline"
        color="blue"
      >
        Import JSON
      </Button>
    </div>
  );
}
