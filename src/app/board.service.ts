import { Injectable } from '@angular/core';
import { Coordinates } from './models/coordinates.model';
import { Pawn } from './models/piece/pawn.model';
import { Piece } from './models/piece/piece.model';
import { files } from './models/file.model';
import { Color } from './models/color.model';
import { Knight } from './models/piece/knight.model';
import { Rook } from './models/piece/rook.model';
import { Bishop } from './models/piece/bishop.model';
import { Queen } from './models/piece/queen.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  pieces = new Map<string, Pawn>();

  constructor() {
    this.setupDefaultPiecePositions();
  }

  setPiece(coordinates: Coordinates, piece: Piece) {
    piece.coordinates = coordinates;
    this.pieces.set(this.coordinatesToString(coordinates), piece);
  }

  private coordinatesToString(coordinates: Coordinates) {
    return coordinates.file + coordinates.rank;
  }

  setupDefaultPiecePositions() {
    // SET PAWNS
    for (const fileKey of files) {
      this.setPiece(
        new Coordinates(fileKey, 2),
        new Pawn(Color.WHITE, new Coordinates(fileKey, 2))
      );
      this.setPiece(
        new Coordinates(fileKey, 7),
        new Pawn(Color.BLACK, new Coordinates(fileKey, 7))
      );
    }

    // SET ROOK
    this.setPiece(
      new Coordinates('A', 1),
      new Rook(Color.WHITE, new Coordinates('A', 1))
    );
    this.setPiece(
      new Coordinates('H', 1),
      new Rook(Color.WHITE, new Coordinates('H', 1))
    );
    this.setPiece(
      new Coordinates('A', 8),
      new Rook(Color.BLACK, new Coordinates('A', 8))
    );
    this.setPiece(
      new Coordinates('H', 8),
      new Rook(Color.BLACK, new Coordinates('H', 8))
    );

    // SET KNIGHT
    this.setPiece(
      new Coordinates('B', 1),
      new Knight(Color.WHITE, new Coordinates('B', 1))
    );
    this.setPiece(
      new Coordinates('G', 1),
      new Knight(Color.WHITE, new Coordinates('G', 1))
    );
    this.setPiece(
      new Coordinates('B', 8),
      new Knight(Color.BLACK, new Coordinates('B', 8))
    );
    this.setPiece(
      new Coordinates('G', 8),
      new Knight(Color.BLACK, new Coordinates('G', 8))
    );

    // SET BISHOP
    this.setPiece(
      new Coordinates('C', 1),
      new Bishop(Color.WHITE, new Coordinates('C', 1))
    );
    this.setPiece(
      new Coordinates('F', 1),
      new Bishop(Color.WHITE, new Coordinates('F', 1))
    );
    this.setPiece(
      new Coordinates('C', 8),
      new Bishop(Color.BLACK, new Coordinates('C', 8))
    );
    this.setPiece(
      new Coordinates('F', 8),
      new Bishop(Color.BLACK, new Coordinates('F', 8))
    );

    // SET QUEENS
    this.setPiece(
      new Coordinates('D', 1),
      new Queen(Color.WHITE, new Coordinates('D', 1))
    );
    this.setPiece(
      new Coordinates('D', 8),
      new Queen(Color.BLACK, new Coordinates('D', 8))
    );
  }

  getPiece(coordinates: Coordinates) {
    return this.pieces.get(this.coordinatesToString(coordinates));
  }
}
