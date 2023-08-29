import { Subject } from 'rxjs';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';
import { Board } from '../board.model';
import { LongRangePiece } from './long-range-piece.model';

export class Bishop extends LongRangePiece {
  sprite = this.color === Color.WHITE ? '&#x2657;' : '&#x265D;';
  override getPieceMoves(): CoordinatesShift[] {
    return Bishop.getBishopMoves();
  }

  static getBishopMoves(): CoordinatesShift[] {
    let result: CoordinatesShift[] = [];
    // bottom-left to top-right
    for (let i = -7; i <= 7; i++) {
      if (i === 0) continue;
      result.push(new CoordinatesShift(i, i));
    }

    // top-left to bottom-right
    for (let i = -7; i <= 7; i++) {
      if (i === 0) continue;
      result.push(new CoordinatesShift(i, -i));
    }

    return result;
  }
}
