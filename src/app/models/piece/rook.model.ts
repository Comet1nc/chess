import { Subject } from 'rxjs';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';
import { Board } from '../board.model';

export class Rook extends Piece {
  sprite = this.color === Color.WHITE ? '&#x2656;' : '&#x265C;';
  override getPieceMoves(): CoordinatesShift[] {
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

  override isSquareAvailableForMove(
    coordinates: Coordinates,
    board: Board
  ): boolean {
    let result: boolean = super.isSquareAvailableForMove(coordinates, board);

    if (result) {
      // 1. get squares between current pos and target pos
      // 2. check that square is free
      let coordinatesBetween;
      if (this.coordinates.file === coordinates.file) {
        coordinatesBetween = board.getVerticalCoordinatesBetween(
          this.coordinates,
          coordinates
        );
      } else {
        coordinatesBetween = board.getHorizontalCoordinatesBetween(
          this.coordinates,
          coordinates
        );
      }

      for (let cords of coordinatesBetween) {
        if (!board.isSquareEmpty(cords)) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }
}
