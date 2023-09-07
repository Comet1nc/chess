import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { GameService } from 'src/app/game.service';
import { Coordinates } from 'src/app/models/coordinates.model';
import { File, files } from 'src/app/models/file.model';
import { Piece } from 'src/app/models/piece/piece.model';
import { Rank, ranks } from 'src/app/models/rank.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  readonly ranks: Rank[] = ranks.reverse() as Rank[];
  readonly files: File[] = files;

  constructor(
    public boardService: BoardService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.updateGameState();
  }

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
    this.boardService.moveSelectedPiece(new Coordinates(file, rank));
    this.gameService.updateGameState();
  }
}
