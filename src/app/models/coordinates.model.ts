import { CoordinatesShift } from './coordinates-shift.model';
import { File, files } from './file.model';
import { Rank, ranks } from './rank.model';

export class Coordinates {
  constructor(public file: File, public rank: Rank) {}

  shift(shift: CoordinatesShift): Coordinates {
    return new Coordinates(
      files[files.indexOf(this.file) + shift.fileShift],
      ranks[ranks.indexOf(this.rank) + shift.rankShift]
    );
  }

  canShift(shift: CoordinatesShift): boolean {
    let f = files.indexOf(this.file) + shift.fileShift;
    let r = ranks.indexOf(this.rank) + shift.rankShift;

    if (f < 0 || f > 7) return false;
    if (r < 0 || r > 7) return false;

    return true;
  }
}
