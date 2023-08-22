import { Subject } from 'rxjs';
import { Board } from '../board.model';
import { Color } from '../color.model';
import { CoordinatesShift } from '../coordinates-shift.model';
import { Coordinates } from '../coordinates.model';
import { Piece } from './piece.model';

export class King extends Piece {
  sprite = this.color === Color.WHITE ? '&#x2654;' : '&#x265A;';
  override getPieceMoves(): CoordinatesShift[] {
    throw new Error('Method not implemented.');
  }
}
