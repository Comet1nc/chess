import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Coordinates } from 'src/app/models/coordinates.model';
import { File, files } from 'src/app/models/file.model';
import { Piece } from 'src/app/models/piece/piece.model';
import { Rank, ranks } from 'src/app/models/rank.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  readonly ranks: Rank[] = ranks.reverse() as Rank[];
  readonly files: File[] = files;

  constructor(public boardService: BoardService) {}

  getPiece(rank: Rank, file: File) {
    return this.boardService.board.getPiece(
      new Coordinates(file, rank)
    ) as Piece;
  }

  moveHereSelectedPiece(rank: Rank, file: File) {
    const to = new Coordinates(file, rank);
    if (!this.boardService.selectedPiece) return;

    const canMove = this.boardService.selectedPiece
      .getAvailableMoveSquares(this.boardService.board)
      .find((cords) => cords.file === to.file && cords.rank === to.rank);

    const enemyIsHere = this.boardService.board.getPiece(to);

    if (canMove) {
      if (enemyIsHere) {
        this.boardService.board.removePiece(to);
      }

      this.boardService.board.movePiece(
        this.boardService.selectedPiece.coordinates,
        to
      );
      this.boardService.selectPiece(undefined);

      this.boardService.isWhiteToMove = !this.boardService.isWhiteToMove;
    }
  }
}
