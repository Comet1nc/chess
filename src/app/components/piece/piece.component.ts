import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { BoardService } from 'src/app/board.service';
import { Color } from 'src/app/models/color.model';
import { Coordinates } from 'src/app/models/coordinates.model';
import { Piece } from 'src/app/models/piece/piece.model';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss'],
})
export class PieceComponent {
  @Input() piece!: Piece;

  constructor(private boardService: BoardService) {}

  selectPiece() {
    if (this.boardService.isWhiteMove && this.piece?.color === Color.WHITE) {
      this.boardService.selectPiece(this.piece);
    }
    if (!this.boardService.isWhiteMove && this.piece?.color === Color.BLACK) {
      this.boardService.selectPiece(this.piece);
    }
  }
}
