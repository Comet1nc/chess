import { Subject } from 'rxjs';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Queen extends Piece {
  sprite = this.color === Color.WHITE ? '&#x2655;' : '&#x265B;';
  override getPieceMoves(): CoordinatesShift[] {
    throw new Error('Method not implemented.');
  }
}
