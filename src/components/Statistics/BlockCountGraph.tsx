import { SchematicJSON } from '@/interfaces/SchematicJSON';
import { DonutChart, DonutChartCell } from '@mantine/charts';
import { useEffect, useState } from 'react';

export const BlockCountGraph = ({ jsonData }: { jsonData: SchematicJSON }) => {
  const [blockData, setBlockData] = useState<DonutChartCell[]>([]);

  const countBlocks = () => {
    const newBlockData: DonutChartCell[] = [];

    // { name: 'minecraft:dirt', value: count, color: '#ff0000' }
    jsonData.header.material_list.root_entry.forEach((entry) => {
      // Calculate a random color
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

      newBlockData.push({
        name: entry.item.id,
        value: entry.count,
        color: color,
      });
    });

    setBlockData(newBlockData);
  };

  useEffect(() => {
    countBlocks();
  }, [jsonData]);

  return <DonutChart data={blockData} withLabels />;
};
