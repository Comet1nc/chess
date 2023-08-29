import { Injectable } from '@angular/core';
import { Coordinates } from './models/coordinates.model';
import { Pawn } from './models/piece/pawn.model';
import { Piece } from './models/piece/piece.model';
import { File, files } from './models/file.model';
import { Color } from './models/color.model';
import { Knight } from './models/piece/knight.model';
import { Rook } from './models/piece/rook.model';
import { Bishop } from './models/piece/bishop.model';
import { Queen } from './models/piece/queen.model';
import { King } from './models/piece/king.model';
import { Board } from './models/board.model';
import { Rank, ranks } from './models/rank.model';
import { PieceFen } from './models/piece-fen.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  board: Board;
  public get pieces() {
    return this.board.pieces;
  }
  public set pieces(value) {
    this.board.pieces = value;
  }

  isWhiteMove: boolean = true;
  selectedPiece: Piece | undefined;

  readonly defaultBoardFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

  constructor() {
    // this.setupDefaultPiecePositions();

    this.board = this.createBoardFromFen('3k4/6r1/8/1P2Q3/8/6P1/4r3/3K4');
    // bishop test '3k4/8/5n2/2N5/3B4/8/8/3K4'
    // rook test '3k4/8/p7/8/R7/8/P7/3K4'
    // queen test '3k4/6r1/8/1P2Q3/8/6P1/4r3/3K4'
  }

  createBoardFromFen(fen: string) {
    let board = new Board();

    const parts = fen.split(' ');
    const piecePositions = parts[0];
    const fenRows = piecePositions.split('/');
    for (let i = 0; i < fenRows.length; i++) {
      const row = fenRows[i];
      const rank = 8 - i;
      let fileIndex = 0;

      for (let j = 0; j < row.length; j++) {
        const fenChar = row.charAt(j);

        if (Number.parseInt(fenChar)) {
          fileIndex += Number.parseInt(fenChar);
        } else {
          const file = files[fileIndex];
          const cords = new Coordinates(file, rank as Rank);

          board.setPiece(
            cords,
            this.pieceFromFenChar(fenChar as PieceFen, cords)
          );
          fileIndex++;
        }
      }
    }

    return board;
  }

  pieceFromFenChar(fen: PieceFen, cords: Coordinates): Piece {
    switch (fen) {
      case 'p':
        return new Pawn(Color.BLACK, cords);
      case 'P':
        return new Pawn(Color.WHITE, cords);
      case 'r':
        return new Rook(Color.BLACK, cords);
      case 'R':
        return new Rook(Color.WHITE, cords);
      case 'n':
        return new Knight(Color.BLACK, cords);
      case 'N':
        return new Knight(Color.WHITE, cords);
      case 'b':
        return new Bishop(Color.BLACK, cords);
      case 'B':
        return new Bishop(Color.WHITE, cords);
      case 'q':
        return new Queen(Color.BLACK, cords);
      case 'Q':
        return new Queen(Color.WHITE, cords);
      case 'k':
        return new King(Color.BLACK, cords);
      case 'K':
        return new King(Color.WHITE, cords);
    }
  }

  selectPiece(piece: Piece | undefined) {
    if (this.selectedPiece) {
      this.selectedPiece.selected = false;
    }

    this.selectedPiece = piece;

    if (!piece) return;

    piece.selected = true;

    this.projectPossibleMoves();
  }

  projectPossibleMoves() {}

  setupDefaultPiecePositions() {
    // SET PAWNS
    for (const fileKey of files) {
      this.board.setPiece(
        new Coordinates(fileKey, 2),
        new Pawn(Color.WHITE, new Coordinates(fileKey, 2))
      );
      this.board.setPiece(
        new Coordinates(fileKey, 7),
        new Pawn(Color.BLACK, new Coordinates(fileKey, 7))
      );
    }

    // SET ROOK
    this.board.setPiece(
      new Coordinates('A', 1),
      new Rook(Color.WHITE, new Coordinates('A', 1))
    );
    this.board.setPiece(
      new Coordinates('H', 1),
      new Rook(Color.WHITE, new Coordinates('H', 1))
    );
    this.board.setPiece(
      new Coordinates('A', 8),
      new Rook(Color.BLACK, new Coordinates('A', 8))
    );
    this.board.setPiece(
      new Coordinates('H', 8),
      new Rook(Color.BLACK, new Coordinates('H', 8))
    );

    // SET KNIGHT
    this.board.setPiece(
      new Coordinates('B', 1),
      new Knight(Color.WHITE, new Coordinates('B', 1))
    );
    this.board.setPiece(
      new Coordinates('G', 1),
      new Knight(Color.WHITE, new Coordinates('G', 1))
    );
    this.board.setPiece(
      new Coordinates('B', 8),
      new Knight(Color.BLACK, new Coordinates('B', 8))
    );
    this.board.setPiece(
      new Coordinates('G', 8),
      new Knight(Color.BLACK, new Coordinates('G', 8))
    );

    // SET BISHOP
    this.board.setPiece(
      new Coordinates('C', 1),
      new Bishop(Color.WHITE, new Coordinates('C', 1))
    );
    this.board.setPiece(
      new Coordinates('F', 1),
      new Bishop(Color.WHITE, new Coordinates('F', 1))
    );
    this.board.setPiece(
      new Coordinates('C', 8),
      new Bishop(Color.BLACK, new Coordinates('C', 8))
    );
    this.board.setPiece(
      new Coordinates('F', 8),
      new Bishop(Color.BLACK, new Coordinates('F', 8))
    );

    // SET QUEENS
    this.board.setPiece(
      new Coordinates('D', 1),
      new Queen(Color.WHITE, new Coordinates('D', 1))
    );
    this.board.setPiece(
      new Coordinates('D', 8),
      new Queen(Color.BLACK, new Coordinates('D', 8))
    );

    // SET QUEENS
    this.board.setPiece(
      new Coordinates('E', 1),
      new King(Color.WHITE, new Coordinates('E', 1))
    );
    this.board.setPiece(
      new Coordinates('E', 8),
      new King(Color.BLACK, new Coordinates('E', 8))
    );
  }
}
