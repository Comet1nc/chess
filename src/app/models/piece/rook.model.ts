import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Rook extends Piece {
  sprite = this.color === Color.WHITE ? '&#x2656;' : '&#x265C;';
  override getPieceMoves(): CoordinatesShift[] {
    throw new Error('Method not implemented.');
  }
}
