import { Color } from '../color.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class King implements Piece {
  name = 'default';
  sprite = 'default';
  constructor(public color: Color, public coordinates: Coordinates) {}
}
