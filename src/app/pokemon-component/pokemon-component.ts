import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../model/Pokemon';

@Component({
  selector: 'pokemon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pokemon">
      @if (pokemon) {
      <img [src]="pokemon.imageUrl" [alt]="pokemon.name" class="pokemon-image">

      <div class="pokemon-properties">
        <div class="property">
          <span class="prop-name">Name: </span>
          <span class="prop-value">{{ pokemon.name }}</span>
        </div>
        <div class="property">
          <span class="prop-name">Types: </span>
          <span class="prop-value">{{ pokemon.types }}</span>
        </div>
        <div class="property">
          <span class="prop-name">Power: </span>
          <span class="prop-value">{{ pokemon.power }}</span>
        </div>
      </div>
      }
    </div>
  `,
  styles: [`
    .pokemon-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 8px;
      width: 150px;
      text-align: center;
      background: #f8f8f8;
    }

    .pokemon-image {
      width: 96px;
      height: 96px;
      margin-bottom: 8px;
    }

    .pokemon-properties {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }

    .property {
      display: flex;
      justify-content: space-between;
    }

    .prop-name {
      font-weight: bold;
    }

    .prop-value {
      text-align: right;
    }
  `]
})
export class PokemonComponent {
  @Input() pokemon: Pokemon | undefined;
}
