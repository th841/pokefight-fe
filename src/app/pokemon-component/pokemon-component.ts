import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../model/Pokemon';

@Component({
  selector: 'pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-component.html',
  styleUrl: './pokemon-component.scss'
})
export class PokemonComponent {
  @Input() pokemon: Pokemon | undefined;
}
