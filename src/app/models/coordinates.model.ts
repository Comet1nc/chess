import { File } from './file.model';
import { Rank } from './rank.model';

export class Coordinates {
  constructor(public file: File, public rank: Rank) {}
}
