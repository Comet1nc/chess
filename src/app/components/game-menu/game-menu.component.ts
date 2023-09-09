import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GameService } from 'src/app/game.service';
import { GameState } from 'src/app/models/game-state.enum';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss'],
})
export class GameMenuComponent {
  timer$ = interval(1000);
  winner$ = this.gameService.gameIsFinished$.pipe(
    map((e) => {
      if (!e) return '';
      if (this.gameService.gameState === GameState.CHECKMATE_TO_BLACK_KING) {
        return 'WHITE WINS';
      } else if (
        this.gameService.gameState === GameState.CHECKMATE_TO_WHITE_KING
      ) {
        return 'BLACK WINS';
      } else {
        return 'DRAW';
      }
    })
  );

  restart() {
    this.gameService.restartGame();
  }

  constructor(public gameService: GameService) {}
}
