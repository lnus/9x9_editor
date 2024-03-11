import { NBTData } from 'nbtify';

// ANCHOR: NBT data interface extension
// Extend the NBTData interface to include specific types relating to the Schematic NBT
interface Bounds {
  maxX: number;
  maxY: number;
  maxZ: number;
  minX: number;
  minY: number;
  minZ: number;
}

interface Header {
  author: string;
  bounds: Bounds;
  name: string;
}

interface BlockData {
  data: {} | null; // This one is peculiar
  state: BlockState;
}

interface BlockState {
  Name: string;
  Properties: {
    [key: string]: string;
  } | null;
}

// TODO: Actually build this out, sometime...
// Currently just a placeholder
// Keep this exactly the same, for testing
export interface SchematicNBT extends NBTData {
  data: {
    data: any[];
    header: any;
    pos: any[];
  };
}
