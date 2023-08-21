import { Coordinates } from './coordinates.model';
import { Piece } from './piece/piece.model';
import { files } from './file.model';
import { Color } from './color.model';
import { Pawn } from './piece/pawn.model';
import { Map as myMap } from 'immutable';

export class Board {
  pieces = new Map<string, Piece>();

  getPiece(coordinates: Coordinates) {
    return this.pieces.get(this.coordinatesToString(coordinates));
  }

  coordinatesToString(coordinates: Coordinates) {
    return coordinates.file + coordinates.rank;
  }

  isSquareEmpty(coordinates: Coordinates): boolean {
    if (this.pieces.get(this.coordinatesToString(coordinates))) {
      return false;
    } else {
      return true;
    }
  }
}
