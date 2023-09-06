import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { BoardService } from 'src/app/board.service';
import { GameService } from 'src/app/game.service';
import { Color } from 'src/app/models/color.model';
import { Coordinates } from 'src/app/models/coordinates.model';
import { GameState } from 'src/app/models/game-state.enum';
import { Piece } from 'src/app/models/piece/piece.model';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss'],
})
export class PieceComponent {
  @Input() piece!: Piece;

  constructor(private boardService: BoardService, private game: GameService) {}

  selectPiece() {
    if (this.game.gameState !== GameState.ONGOING) return;

    if (
      this.boardService.colorToMove === Color.WHITE &&
      this.piece?.color === Color.WHITE
    ) {
      this.boardService.selectPiece(this.piece);
    }
    if (
      this.boardService.colorToMove === Color.BLACK &&
      this.piece?.color === Color.BLACK
    ) {
      this.boardService.selectPiece(this.piece);
    }
  }
}
