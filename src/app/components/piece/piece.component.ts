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
export class PieceComponent implements OnInit {
  @Input() piece!: Piece;
  // to do change detection

  onSelectedColor$!: Observable<string>;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.onSelectedColor$ = this.piece.selected$.pipe(
      map((selected: boolean) => (selected ? '#b3daff9e' : 'unset'))
    );
  }

  selectPiece() {
    const moveAsWhite = this.piece?.color === Color.WHITE;

    if (this.boardService.isWhiteToMove && moveAsWhite) {
      this.boardService.selectPiece(this.piece);
    } else if (!this.boardService.isWhiteToMove && !moveAsWhite) {
      this.boardService.selectPiece(this.piece);
    }
  }
}
