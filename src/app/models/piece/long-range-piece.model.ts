import { Board } from '../board.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export abstract class LongRangePiece extends Piece {
  override isSquareAvailableForMove(
    coordinates: Coordinates,
    board: Board
  ): boolean {
    let result: boolean = super.isSquareAvailableForMove(coordinates, board);

    if (result) {
      return this.isSquareAvailableForAttack(coordinates, board);
    } else {
      return false;
    }
  }

  override isSquareAvailableForAttack(
    coordinates: Coordinates,
    board: Board
  ): boolean {
    let coordinatesBetween;
    if (this.coordinates.file === coordinates.file) {
      coordinatesBetween = board.getVerticalCoordinatesBetween(
        this.coordinates,
        coordinates
      );
    } else if (this.coordinates.rank === coordinates.rank) {
      coordinatesBetween = board.getHorizontalCoordinatesBetween(
        this.coordinates,
        coordinates
      );
    } else {
      coordinatesBetween = board.getDiagonalCoordinatesBetween(
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
  }
}
