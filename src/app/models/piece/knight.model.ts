import { Color } from '../color.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Knight implements Piece {
  name = 'Knight';
  sprite = this.color === Color.WHITE ? '&#x2658;' : '&#x265E;';

  constructor(public color: Color, public coordinates: Coordinates) {}
}
