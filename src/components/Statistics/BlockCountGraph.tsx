import { useData } from '@/contexts/DataContext';
import { DonutChart, DonutChartCell, RadarChart, RadarChartProps } from '@mantine/charts';
import { useEffect, useState } from 'react';

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

export const BlockCountGraph = () => {
  const [blockData, setBlockData] = useState<Object[]>([]);
  const { jsonData } = useData();

  if (jsonData === null) {
    return null;
  }

  const countBlocks = () => {
    const newBlockData: Object[] = [];

    jsonData.header.material_list.root_entry.forEach((entry) => {
      newBlockData.push({
        block: entry.item.id,
        count: entry.count,
      });
    });

    setBlockData(newBlockData);
  };

  useEffect(() => {
    countBlocks();
  }, [jsonData]);

  return (
    <RadarChart
      h={'70vh'}
      data={blockData}
      withPolarRadiusAxis
      dataKey="block"
      series={[
        {
          name: 'count',
          color: 'blue',
        },
      ]}
    />
  );
};
