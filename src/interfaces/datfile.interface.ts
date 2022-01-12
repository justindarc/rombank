export interface DATFile {
  id: number;
  name: string;
  description?: string;
  version?: string;
  date?: Date;
  author?: string;
  homepage?: string;
  url?: string;
  path: string;
}
