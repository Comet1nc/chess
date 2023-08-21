import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Bishop extends Piece {
  sprite = this.color === Color.WHITE ? '&#x2657;' : '&#x265D;';
  override getPieceMoves(): CoordinatesShift[] {
    throw new Error('Method not implemented.');
  }
}
