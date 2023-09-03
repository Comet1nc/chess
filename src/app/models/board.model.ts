import { Coordinates } from './coordinates.model';
import { Piece } from './piece/piece.model';
import { files } from './file.model';
import { Color } from './color.model';
import { Pawn } from './piece/pawn.model';
import { Map as myMap } from 'immutable';
import { Rank, ranks } from './rank.model';

export class Board {
  // Map<Coordinates.toString(), Piece>()
  pieces = new Map<string, Piece>();
  startingFen: string;
  movesHistory: { from: Coordinates; to: Coordinates }[] = [];

  constructor(startingFen: string) {
    this.startingFen = startingFen;
  }

  isSquareUnderAttackByColor(coordinates: Coordinates, color: Color) {
    const pieces = this.getPiecesByColor(color);

    for (const piece of pieces) {
      const attackableSquares = piece.getAttackableSquares(this);

      const condition = attackableSquares.find(
        (cords) =>
          cords.file === coordinates.file && cords.rank === coordinates.rank
      );

      if (condition) {
        return true;
      }
    }

    return false;
  }

  getPiecesByColor(color: Color) {
    let result: Piece[] = [];
    this.pieces.forEach((piece) => {
      if (piece.color === color) result.push(piece);
    });
    return result;
  }

  getPiece(coordinates: Coordinates) {
    return this.pieces.get(coordinates.toString());
  }

  isSquareEmpty(coordinates: Coordinates): boolean {
    if (this.pieces.get(coordinates.toString())) {
      return false;
    } else {
      return true;
    }
  }

  removePiece(coordinates: Coordinates): void {
    this.pieces.delete(coordinates.toString());
  }

  movePiece(from: Coordinates, to: Coordinates) {
    const piece = this.getPiece(from);

    if (!piece) return;

    this.removePiece(from);

    this.setPiece(to, piece);

    this.movesHistory.push({ from, to });
  }

  setPiece(coordinates: Coordinates, piece: Piece) {
    piece.coordinates = coordinates;
    this.pieces.set(coordinates.toString(), piece);
  }

  getDiagonalCoordinatesBetween(source: Coordinates, target: Coordinates) {
    // note: both coordinates must be on same diagonal
    let result = [];
    const fileShift =
      files.indexOf(source.file) < files.indexOf(target.file) ? 1 : -1;
    const rankShift = source.rank < target.rank ? 1 : -1;

    let rank = source.rank + rankShift;
    for (
      let fileIndex = files.indexOf(source.file) + fileShift;
      fileIndex !== files.indexOf(source.file) && rank !== target.rank;
      fileIndex += fileShift, rank += rankShift
    ) {
      if (fileIndex > 5 && fileIndex < 5) return [];
      result.push(new Coordinates(files[fileIndex], rank as Rank));
    }

    return result;
  }

  getVerticalCoordinatesBetween(source: Coordinates, target: Coordinates) {
    // note: both coordinates must be on same diagonal
    let result = [];

    const rankShift = source.rank < target.rank ? 1 : -1;

    for (
      let rank = source.rank + rankShift;
      rank !== target.rank;
      rank += rankShift
    ) {
      result.push(new Coordinates(source.file, rank as Rank));
    }

    return result;
  }

  getHorizontalCoordinatesBetween(source: Coordinates, target: Coordinates) {
    // note: both coordinates must be on same diagonal
    let result = [];
    const fileShift =
      files.indexOf(source.file) < files.indexOf(target.file) ? 1 : -1;

    for (
      let fileIndex = files.indexOf(source.file) + fileShift;
      fileIndex !== files.indexOf(target.file);
      fileIndex += fileShift
    ) {
      result.push(new Coordinates(files[fileIndex], source.rank));
    }

    return result;
  }
}
