export type RemoteFileType = 'file' | 'directory';

export interface RemoteFile {
  name: string;
  path: string;
  type: RemoteFileType;
  size?: number;
}
