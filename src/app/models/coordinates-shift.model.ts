import { File } from './file.model';
import { Rank } from './rank.model';

export class CoordinatesShift {
  constructor(public fileShift: number, public rankShift: number) {}
}
