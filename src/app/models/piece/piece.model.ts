import { Color } from '../color.model';
import { Coordinates } from '../coordinates.model';

export abstract class Piece {
  name = 'default';
  sprite = 'default';
  constructor(public color: Color, public coordinates: Coordinates) {}
}
