import { Injectable, OnInit } from '@angular/core';
import { GameState } from './models/game-state.enum';
import { BoardService } from './board.service';
import { Color } from './models/color.model';
import { King } from './models/piece/king.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameState: GameState = GameState.ONGOING;
  gameIsFinished$ = new Subject<boolean>();

  constructor(private boardService: BoardService) {}

  updateGameState() {
    this.checkStalemate();
    this.checkMate();
  }

  restartGame() {
    this.boardService.board = this.boardService.createBoardFromFen(
      this.boardService.defaultBoardFen
    );
    this.boardService.colorToMove = Color.WHITE;
    this.gameState = GameState.ONGOING;
    this.gameIsFinished$.next(false);
  }

  checkMate() {
    const king = this.boardService.board
      .getPiecesByColor(this.boardService.colorToMove)
      .find((piece) => piece instanceof King);

    if (
      king !== undefined &&
      !this.boardService.board.isSquareUnderAttackByColor(
        king?.coordinates,
        Color.getOpposite(king?.color)
      )
    ) {
      return;
    }

    const pieces = this.boardService.board.getPiecesByColor(
      this.boardService.colorToMove
    );

    for (const piece of pieces) {
      const cords = piece.getAvailableMoveSquares(this.boardService.board);

      for (const cord of cords) {
        const clone = this.boardService.copy(this.boardService.board);
        clone.movePiece(piece.coordinates, cord);

        const clonedKing = clone
          .getPiecesByColor(this.boardService.colorToMove)
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

    if (this.boardService.colorToMove === Color.WHITE) {
      this.gameState = GameState.CHECKMATE_TO_WHITE_KING;
    } else {
      this.gameState = GameState.CHECKMATE_TO_BLACK_KING;
    }

    this.finishGame();
  }

  checkStalemate() {
    const pieces = this.boardService.board.getPiecesByColor(
      this.boardService.colorToMove
    );
    for (let piece of pieces) {
      let cords = piece.getAvailableMoveSquares(this.boardService.board);
      if (cords.length > 0) {
        return;
      }
    }

    this.gameState = GameState.STALEMATE;
    this.finishGame();
  }

  finishGame() {
    console.log('game ended with state: ' + this.gameState);
    this.gameIsFinished$.next(true);
  }
}
