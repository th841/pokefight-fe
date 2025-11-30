import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BackendService } from '../backend.service';
import { Fight } from '../model/Fight';
import { Dialogservice } from '../dialog.service';

@Component({
  selector: 'fight-history',
  imports: [MatFormField, MatLabel, MatTableModule, MatInputModule],
  templateUrl: './fight-history.html',
  styleUrl: './fight-history.scss',
})
export class FightHistory {

  constructor(
    private readonly backendService: BackendService,
    private readonly dialogService: Dialogservice
  ) { }

  ngOnInit() {
    this.dataSource.filterPredicate = (fight, filter: string) => {
      const search = filter.toLowerCase();

      return fight.fighters.some(pokemon =>
        pokemon.name.toLowerCase().includes(search)
      );
    };
  }

  displayedColumns = ['fighters', 'winner'];

  dataSource = new MatTableDataSource<Fight>();

  loadFights() {
    this.backendService.loadFights().subscribe({
      next: fights => this.dataSource.data = fights,
      error: err => this.dialogService.handleError("Could not load fight history. Please check connectivity.")
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
