import { Component } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Coordinates } from 'src/app/models/coordinates.model';
import { File, files } from 'src/app/models/file.model';
import { Rank, rank } from 'src/app/models/rank.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  readonly ranks: Rank[] = rank.reverse() as Rank[];
  readonly files: File[] = files;

  constructor(private BoardService: BoardService) {}

  getPiece(rank: Rank, file: File) {
    return this.BoardService.getPiece(new Coordinates(file, rank));
  }
}
