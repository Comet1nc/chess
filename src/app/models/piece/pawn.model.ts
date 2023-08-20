import { Color } from '../color.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Pawn implements Piece {
  name = 'Pawn';
  sprite = this.color === Color.WHITE ? '&#x2659;' : '&#x265F;';
  constructor(public color: Color, public coordinates: Coordinates) {}
}
