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

  constructor(private BoardService: BoardService) {}

  getPiece(rank: Rank, file: File) {
    return this.BoardService.board.getPiece(
      new Coordinates(file, rank)
    ) as Piece;
  }

  moveHereSelectedPiece(rank: Rank, file: File) {
    const to = new Coordinates(file, rank);
    if (!this.BoardService.selectedPiece) return;

    const canMove = this.BoardService.selectedPiece
      .getAvailableMoveSquares(this.BoardService.board)
      .find((cords) => cords.file === to.file && cords.rank === to.rank);

    const enemyIsHere = this.BoardService.board.getPiece(to);

    if (canMove) {
      if (enemyIsHere) {
        this.BoardService.board.removePiece(to);
      }

      this.BoardService.board.movePiece(
        this.BoardService.selectedPiece.coordinates,
        to
      );
      this.BoardService.selectedPiece = undefined;
      console.log('log2');
    }

    console.log(this.BoardService.selectedPiece);

    console.log(
      this.BoardService.selectedPiece?.getAvailableMoveSquares(
        this.BoardService.board
      )
    );

    console.log(to);

    console.log(canMove);
  }
}
