import { Subject } from 'rxjs';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';
import { Board } from '../board.model';
import { LongRangePiece } from './long-range-piece.model';

export class Rook extends LongRangePiece {
  sprite = this.color === Color.WHITE ? '&#x2656;' : '&#x265C;';
  override getPieceMoves(): CoordinatesShift[] {
    return Rook.getRookMoves();
  }

  static getRookMoves(): CoordinatesShift[] {
    let result: CoordinatesShift[] = [];

    // left to right
    for (let i = -7; i <= 7; i++) {
      if (i === 0) continue;
      result.push(new CoordinatesShift(i, 0));
    }

    // bottom to top
    for (let i = -7; i <= 7; i++) {
      if (i === 0) continue;
      result.push(new CoordinatesShift(0, i));
    }

    return result;
  }
}
