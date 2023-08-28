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

  isCellWhite(i: number, j: number) {
    return (i + 1 * j) % 2 === 0;
  }

  cellBg(indexes: number[], rank: Rank, file: File) {
    if (this.boardService.selectedPiece) {
      const canMoveHere = this.boardService.selectedPiece
        .getAvailableMoveSquares(this.boardService.board)
        .find((cords) => cords.file === file && cords.rank === rank);

      if (canMoveHere) {
        return '#398fffa9';
      }
    }

    return (indexes[0] + 1 * indexes[1]) % 2 === 0 ? '#cecece' : '#737373';
  }

  moveHereSelectedPiece(rank: Rank, file: File) {
    const to = new Coordinates(file, rank);

    if (!this.boardService.selectedPiece) return;

    if (
      this.boardService.selectedPiece.coordinates.file === to.file &&
      this.boardService.selectedPiece.coordinates.rank === to.rank
    )
      return;

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

      this.boardService.isWhiteMove = !this.boardService.isWhiteMove;
    }
  }
}
