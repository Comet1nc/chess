import { Subject } from 'rxjs';
import { Board } from '../board.model';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Knight extends Piece {
  sprite = this.color === Color.WHITE ? '&#x2658;' : '&#x265E;';
  override getPieceMoves(): CoordinatesShift[] {
    return [
      new CoordinatesShift(1, 2),
      new CoordinatesShift(2, 1),
      new CoordinatesShift(2, -1),
      new CoordinatesShift(1, -2),
      new CoordinatesShift(-2, -1),
      new CoordinatesShift(-1, -2),
      new CoordinatesShift(-2, 1),
      new CoordinatesShift(-1, 2),
    ];
  }
}
