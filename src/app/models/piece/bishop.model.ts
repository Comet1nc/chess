import { Color } from '../color.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Bishop implements Piece {
  name = 'default';
  sprite = this.color === Color.WHITE ? '&#x2657;' : '&#x265D;';
  constructor(public color: Color, public coordinates: Coordinates) {}
}
