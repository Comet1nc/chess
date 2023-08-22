import { Subject } from 'rxjs/internal/Subject';
import { Board } from '../board.model';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';

export abstract class Piece {
  abstract sprite: string;
  selected$ = new Subject<boolean>();
  constructor(public color: Color, public coordinates: Coordinates) {}

  getAvailableMoveSquares(board: Board): Coordinates[] {
    let result: Coordinates[] = [];

    for (let shift of this.getPieceMoves()) {
      if (this.coordinates.canShift(shift)) {
        let newCoordinates = this.coordinates.shift(shift);

        if (this.isSquareAvailableForMove(newCoordinates, board)) {
          result.push(newCoordinates);
        }
      }
    }

    return result;
  }

  private isSquareAvailableForMove(
    coordinates: Coordinates,
    board: Board
  ): boolean {
    return (
      board.isSquareEmpty(coordinates) ||
      board.getPiece(coordinates)?.color !== this.color
    );
  }

  abstract getPieceMoves(): CoordinatesShift[];
}
