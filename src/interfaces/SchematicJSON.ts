export interface SchematicJSON {
  header: Header;
  body: string;
}

export interface Header {
  version: string;
  mc_version: string;
  name: string;
  author: string;
  bounding_box: BoundingBox;
  material_list: MaterialList;
}

export interface BoundingBox {
  min_x: number;
  min_y: number;
  min_z: number;
  max_x: number;
  max_y: number;
  max_z: number;
}

export interface MaterialList {
  root_type: string;
  root_entry: RootEntry[];
}

export interface RootEntry {
  item_type: string;
  count: number;
  item: Item;
}

export interface Item {
  id: string;
}
