import { ChangeDetectorRef, Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackendService } from './backend.service';
import { Pokemon } from './model/Pokemon';
import { PokemonComponent } from "./pokemon-component/pokemon-component";
import { FightHistory } from './fight-history/fight-history';
import { switchMap } from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Dialogservice } from './dialog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule, PokemonComponent, MatTabsModule, MatTableModule, FightHistory],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  public pokemons: Pokemon[] = [];
  public winner: Pokemon | undefined;
  public fights: any[] = [];

  constructor(
    private readonly backendService: BackendService,
    private readonly dialogService: Dialogservice,
    private cdr: ChangeDetectorRef
  ) { }

  @ViewChild('fighthistory') fightHistory!: FightHistory;

  onFightButtonClick() {
    this.backendService.loadPokemons().pipe(
      switchMap(pokemons => {
        this.pokemons = pokemons;
        this.cdr.detectChanges();
        return this.backendService.fight(pokemons);
      })
    ).subscribe({
      next: winner => {
        this.winner = winner;
        this.cdr.detectChanges();
      },
      error: err => this.dialogService.handleError("Could not perform fight. Please check connectivity.")
    });
  }

  onTabChange(index: number) {
    if (index === 1) {
      this.fightHistory.loadFights();
    }
  }

  protected readonly title = signal('Pokemon Fight App');
}
