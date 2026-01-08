export interface Image {
  id: number;
  src: string;
  name: string;
  dimensions: string;
  ext: string;
  size: string;
  modifiedTime: string;
  selected: boolean;
  active: boolean;
  hash: string;
  thumbnailSrc?: string; // data:image/... base64 thumbnail
}

export type Images = Image[];
