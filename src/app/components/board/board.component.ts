import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Coordinates } from 'src/app/models/coordinates.model';
import { File, files } from 'src/app/models/file.model';
import { Rank, ranks } from 'src/app/models/rank.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  readonly ranks: Rank[] = ranks.reverse() as Rank[];
  readonly files: File[] = files;

  constructor(private BoardService: BoardService) {}
  ngOnInit(): void {
    let testCords = new Coordinates('B', 8);
    let piece = this.BoardService.board.getPiece(testCords);

    console.log(piece?.getAvailableMoveSquares(this.BoardService.board));
  }

  ngAfterViewInit(): void {}

  getPiece(rank: Rank, file: File) {
    return this.BoardService.board.getPiece(new Coordinates(file, rank));
  }
}
