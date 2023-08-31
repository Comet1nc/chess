import { Subject } from 'rxjs/internal/Subject';
import { Board } from '../board.model';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';

export abstract class Piece {
  abstract sprite: string;
  selected: boolean = false;
  constructor(public color: Color, public coordinates: Coordinates) {}

  getAttackableSquares(board: Board): Coordinates[] {
    const pieceAttacks = this.getPieceAttacks();

    let result: Coordinates[] = [];

    for (const attack of pieceAttacks) {
      if (this.coordinates.canShift(attack)) {
        const shifted = this.coordinates.shift(attack);

        if (this.isSquareAvailableForAttack(shifted, board)) {
          result.push(shifted);
        }
      }
    }

    return result;
  }

  protected isSquareAvailableForAttack(
    coordinates: Coordinates,
    board: Board
  ): boolean {
    return true;
  }

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

  protected isSquareAvailableForMove(
    coordinates: Coordinates,
    board: Board
  ): boolean {
    return (
      board.isSquareEmpty(coordinates) ||
      board.getPiece(coordinates)?.color !== this.color
    );
  }

  protected getPieceAttacks() {
    return this.getPieceMoves();
  }

  abstract getPieceMoves(): CoordinatesShift[];
}
