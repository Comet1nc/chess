import { Color } from '../color.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Queen implements Piece {
  name = 'default';
  sprite = this.color === Color.WHITE ? '&#x2655;' : '&#x265B;';
  constructor(public color: Color, public coordinates: Coordinates) {}
}
