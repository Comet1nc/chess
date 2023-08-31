import { Subject } from 'rxjs';
import { Board } from '../board.model';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class Pawn extends Piece {
  sprite = this.color === Color.WHITE ? '&#x2659;' : '&#x265F;';
  override getPieceMoves(): CoordinatesShift[] {
    let result: CoordinatesShift[] = [];
    if (this.color === Color.WHITE) {
      if (this.coordinates.rank === 2) {
        result.push(new CoordinatesShift(0, -2));
      }
      result.push(new CoordinatesShift(0, -1));
      result.push(new CoordinatesShift(-1, -1));
      result.push(new CoordinatesShift(1, -1));
    } else {
      if (this.coordinates.rank === 7) {
        result.push(new CoordinatesShift(0, 2));
      }
      result.push(new CoordinatesShift(0, 1));
      result.push(new CoordinatesShift(-1, 1));
      result.push(new CoordinatesShift(1, 1));
    }

    return result;
  }

  override isSquareAvailableForMove(
    coordinates: Coordinates,
    board: Board
  ): boolean {
    if (coordinates.file === this.coordinates.file) {
      return board.isSquareEmpty(coordinates);
    } else {
      if (board.isSquareEmpty(coordinates)) {
        return false;
      } else {
        return board.getPiece(coordinates)?.color !== this.color;
      }
    }
  }

  protected override getPieceAttacks(): CoordinatesShift[] {
    if (this.color === Color.WHITE) {
      return [new CoordinatesShift(-1, -1), new CoordinatesShift(1, -1)];
    } else {
      return [new CoordinatesShift(-1, 1), new CoordinatesShift(1, 1)];
    }
  }
}
