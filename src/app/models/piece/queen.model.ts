import { Subject } from 'rxjs';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';
import { LongRangePiece } from './long-range-piece.model';
import { Bishop } from './bishop.model';
import { Rook } from './rook.model';

export class Queen extends LongRangePiece {
  sprite = this.color === Color.WHITE ? '&#x2655;' : '&#x265B;';
  override getPieceMoves(): CoordinatesShift[] {
    return [...Rook.getRookMoves(), ...Bishop.getBishopMoves()];
  }
}
