import { Color } from '../color.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Rook implements Piece {
  name = 'default';
  sprite = this.color === Color.WHITE ? '&#x2656;' : '&#x265C;';
  constructor(public color: Color, public coordinates: Coordinates) {}
}
