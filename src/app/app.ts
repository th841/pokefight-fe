import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackendService } from './backend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ErrorDialogComponent } from './error-dialog/error-dialog-component';
import { Pokemon } from './model/Pokemon';
import { PokemonComponent } from "./pokemon-component/pokemon-component";
import { switchMap } from 'rxjs/operators';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule, PokemonComponent, MatTabsModule, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  public pokemons: Pokemon[] = [];
  public winner: Pokemon | undefined;
  public fights: any[] = [];

  constructor(
    private readonly backendService: BackendService,
    private readonly dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

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
      error: err => this.dialog.open(ErrorDialogComponent, {
        data: { message: "Could not load pokemon data. Please check connectivity." }
      })
    });
  }

  onTabChange(index: number) {
    if (index === 1) {
      this.backendService.loadFights().subscribe({
        next: fights => {
          this.fights = fights;
          this.cdr.detectChanges();
        },
        error: err => this.dialog.open(ErrorDialogComponent, {
          data: { message: "Could not load fight history. Please check connectivity." }
        })
      });
    }
  }

  protected readonly title = signal('Pokemon Fight App');
}
