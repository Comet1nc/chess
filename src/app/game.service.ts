import { Injectable, OnInit } from '@angular/core';
import { GameState } from './models/game-state.enum';
import { BoardService } from './board.service';
import { Color } from './models/color.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameState: GameState = GameState.ONGOING;
  board = this.boardService.board;
  currentMoveColor = this.boardService.colorToMove;

  constructor(private boardService: BoardService) {}

  updateGameState() {
    this.check(Color.WHITE);
    if (this.gameState !== GameState.ONGOING) this.finishGame();
  }

  check(color: Color) {
    const pieces = this.board.getPiecesByColor(color);
    for (let piece of pieces) {
      let cords = piece.getAvailableMoveSquares(this.board);
      if (cords.length > 0) {
        return;
      }
    }

    this.gameState = GameState.STALEMATE;
  }

  finishGame() {
    console.log('game ended with state: ' + this.gameState);
  }
}
