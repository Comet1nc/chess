import { Injectable, OnInit } from '@angular/core';
import { GameState } from './models/game-state.enum';
import { BoardService } from './board.service';
import { Color } from './models/color.model';
import { King } from './models/piece/king.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameState: GameState = GameState.ONGOING;
  board = this.boardService.board;
  currentMoveColor = this.boardService.colorToMove;

  constructor(private boardService: BoardService) {}

  updateGameState() {
    this.checkStalemate();
    this.checkMate();
  }

  checkMate() {
    const king = this.board
      .getPiecesByColor(this.currentMoveColor)
      .find((piece) => piece instanceof King);

    if (
      king !== undefined &&
      !this.board.isSquareUnderAttackByColor(
        king?.coordinates,
        Color.getOpposite(king?.color)
      )
    ) {
      return;
    }

    const pieces = this.board.getPiecesByColor(this.currentMoveColor);

    for (const piece of pieces) {
      const cords = piece.getAvailableMoveSquares(this.board);

      for (const cord of cords) {
        const clone = this.boardService.copy(this.board);
        clone.movePiece(piece.coordinates, cord);

        const clonedKing = clone
          .getPiecesByColor(this.currentMoveColor)
          .find((piece) => piece instanceof King);

        if (
          clonedKing !== undefined &&
          !clone.isSquareUnderAttackByColor(
            clonedKing?.coordinates,
            Color.getOpposite(clonedKing.color)
          )
        ) {
          return;
        }
      }
    }

    if (this.currentMoveColor === Color.WHITE) {
      this.gameState = GameState.CHECKMATE_TO_WHITE_KING;
    } else {
      this.gameState = GameState.CHECKMATE_TO_BLACK_KING;
    }

    this.finishGame();
  }

  checkStalemate() {
    const pieces = this.board.getPiecesByColor(this.currentMoveColor);
    for (let piece of pieces) {
      let cords = piece.getAvailableMoveSquares(this.board);
      if (cords.length > 0) {
        return;
      }
    }

    this.gameState = GameState.STALEMATE;
    this.finishGame();
  }

  finishGame() {
    console.log('game ended with state: ' + this.gameState);
  }
}
