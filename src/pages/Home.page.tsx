import { JsonModal } from '@/components/JsonImport/JsonImport';
import { ListDisplay } from '@/components/ListDisplay/ListDisplay';
import { Root } from '@/interfaces/Gadget';
import { useState } from 'react';
import { ButtonCopy } from '@/components/JsonExport/JsonExport';

export function HomePage() {
  const [rootObject, setRootObject] = useState<Root | null>(null);

  return (
    <div>
      <ButtonCopy rootObject={rootObject} />
      <JsonModal setRootObject={setRootObject} />
      <ListDisplay rootObject={rootObject as Root} setRootObject={setRootObject} />
    </div>
  );
}
