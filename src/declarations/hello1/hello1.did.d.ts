import type { Principal } from '@dfinity/principal';
export type Chunk = Array<number>;
export type FileId = string;
export interface _SERVICE {
  'getFile' : (arg_0: FileId) => Promise<[] | [Chunk]>,
  'uplodaFile' : (arg_0: FileId, arg_1: Chunk) => Promise<undefined>,
}
