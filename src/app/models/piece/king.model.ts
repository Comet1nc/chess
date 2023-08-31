import { Subject } from 'rxjs';
import { Board } from '../board.model';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class King extends Piece {
  sprite = this.color === Color.WHITE ? '&#x2654;' : '&#x265A;';
  override getPieceMoves(): CoordinatesShift[] {
    let result: CoordinatesShift[] = [];
    for (let fileShift = -1; fileShift <= 1; fileShift++) {
      for (let rankShift = -1; rankShift <= 1; rankShift++) {
        if (fileShift === 0 && rankShift === 0) continue;
        result.push(new CoordinatesShift(fileShift, rankShift));
      }
    }
    return result;
  }

  override isSquareAvailableForMove(
    coordinates: Coordinates,
    board: Board
  ): boolean {
    let result = super.isSquareAvailableForMove(coordinates, board);
    if (result) {
      return !board.isSquareUnderAttackByColor(
        coordinates,
        Color.getOpposite(this.color)
      );
    }
    return false;
  }
}
