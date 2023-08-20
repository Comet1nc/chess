import { Component, Input, OnInit } from '@angular/core';
import { Piece } from 'src/app/models/piece/piece.model';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss'],
})
export class PieceComponent implements OnInit {
  @Input() piece: Piece | undefined;

  ngOnInit(): void {}
}
